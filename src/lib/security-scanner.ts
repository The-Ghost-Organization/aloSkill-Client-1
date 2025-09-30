import { type NextRequest } from "next/server";

export interface SecurityScanResult {
  isThreat: boolean;
  threats: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  confidence: number;
}

export class SecurityScanner {
  private sqlInjectionPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(\bEXEC\b.*\bSP_)/i,
    /(\bWAITFOR\b.*\bDELAY\b)/i,
    /('|\bOR\b.*=.*-)/i,
    /(\b--\b|\b#\b)/i,
  ];

  private xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<\s*iframe/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /expression\s*\(/gi,
  ];

  private pathTraversalPatterns = [
    /\.\.\//gi,
    /\.\.\\/gi,
    /\/etc\/passwd/gi,
    /\/proc\/self/gi,
    /\/windows\/system32/gi,
    /\.\.%2f/gi,
    /\.\.%5c/gi,
  ];

  private lmsSpecificThreats = [
    /video-download/i,
    /course-scraper/i,
    /exam-bypass/i,
    /certificate-forge/i,
    /answer-bot/i,
    /auto-submit/i,
    /cheat-script/i,
  ];

  private maliciousBots = [
    "ahrefs",
    "semrush",
    "mj12bot",
    "dotbot",
    "megaindex",
    "blexbot",
    "extract",
    "scraper",
    "crawler",
    "python-requests",
    "masscan",
    "nmap",
    "sqlmap",
    "metasploit",
    "nikto",
    "wpscan",
    "burpsuite",
    "zap",
    "gobuster",
    "dirb",
  ];

  async comprehensiveScan(request: NextRequest): Promise<SecurityScanResult> {
    const threats: string[] = [];
    let confidence = 0;

    const url = request.nextUrl.toString();
    const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
    const referer = request.headers.get("referer") || "";
    const { searchParams } = request.nextUrl;

    // SQL Injection Scan
    if (this.scanForSQLInjection(url) || this.scanForSQLInjection(referer)) {
      threats.push("sql_injection");
      confidence += 30;
    }

    // XSS Scan
    if (this.scanForXSS(url) || this.scanForXSS(referer)) {
      threats.push("xss_attempt");
      confidence += 25;
    }

    // Path Traversal
    if (this.scanForPathTraversal(url)) {
      threats.push("path_traversal");
      confidence += 35;
    }

    // LMS-specific Threats
    if (this.scanForLMSTThreats(url, userAgent)) {
      threats.push("lms_content_theft");
      confidence += 20;
    }

    // Suspicious Parameters
    const paramThreats = this.scanSuspiciousParameters(searchParams);
    threats.push(...paramThreats);
    confidence += paramThreats.length * 10;

    // Bot Detection
    if (this.isMaliciousBot(userAgent)) {
      threats.push("malicious_bot");
      confidence += 15;
    }

    // Request Method Anomalies
    if (this.detectMethodAnomalies(request)) {
      threats.push("request_anomaly");
      confidence += 10;
    }

    // Header Manipulation
    if (this.detectHeaderManipulation(request)) {
      threats.push("header_manipulation");
      confidence += 15;
    }

    return {
      isThreat: threats.length > 0,
      threats,
      riskLevel: this.calculateRiskLevel(threats, confidence),
      confidence,
    };
  }

  private scanForSQLInjection(input: string): boolean {
    return this.sqlInjectionPatterns.some(pattern => pattern.test(input));
  }

  private scanForXSS(input: string): boolean {
    return this.xssPatterns.some(pattern => pattern.test(input));
  }

  private scanForPathTraversal(input: string): boolean {
    return this.pathTraversalPatterns.some(pattern => pattern.test(input));
  }

  private scanForLMSTThreats(url: string, userAgent: string): boolean {
    const patternThreats = this.lmsSpecificThreats.some(
      pattern => pattern.test(url) || pattern.test(userAgent)
    );

    const downloadTools = ["youtube-dl", "ffmpeg", "vdownloader", "atube", "jdownloader"];
    const cheatingTools = ["auto-clicker", "cheat-engine", "exam-solver", "answer-key"];

    return (
      patternThreats ||
      downloadTools.some(tool => userAgent.includes(tool)) ||
      cheatingTools.some(tool => userAgent.includes(tool))
    );
  }

  private scanSuspiciousParameters(searchParams: URLSearchParams): string[] {
    const threats: string[] = [];
    const suspiciousParams = [
      "debug",
      "test",
      "admin",
      "root",
      "password",
      "token",
      "key",
      "auth",
      "bypass",
      "secret",
      "api_key",
      "access_token",
      "jwt",
      "credential",
    ];

    for (const [key, value] of searchParams.entries()) {
      const lowerKey = key.toLowerCase();
      const _lowerValue = value.toLowerCase();

      // Suspicious parameter names
      if (suspiciousParams.some(param => lowerKey.includes(param))) {
        threats.push("suspicious_parameter_name");
      }

      // SQL Injection in parameters
      if (this.scanForSQLInjection(value)) {
        threats.push("parameter_sql_injection");
      }

      // XSS in parameters
      if (this.scanForXSS(value)) {
        threats.push("parameter_xss");
      }

      // Long parameter values (potential buffer overflow)
      if (value.length > 1000) {
        threats.push("oversized_parameter");
      }
    }

    return threats;
  }

  private isMaliciousBot(userAgent: string): boolean {
    return this.maliciousBots.some(bot => userAgent.includes(bot));
  }

  private detectMethodAnomalies(request: NextRequest): boolean {
    const method = request.method;
    const pathname = request.nextUrl.pathname;

    // POST requests to typically GET endpoints
    if (method === "POST" && (pathname.includes("/video/") || pathname.includes("/document/"))) {
      return true;
    }

    // TRACE, TRACK methods (security probing)
    if (["TRACE", "TRACK", "CONNECT"].includes(method)) {
      return true;
    }

    return false;
  }

  private detectHeaderManipulation(request: NextRequest): boolean {
    const headers = request.headers;

    // Multiple X-Forwarded-For headers
    const xff = headers.get("x-forwarded-for");
    if (xff && xff.split(",").length > 5) {
      return true;
    }

    // Suspicious user-agent patterns
    const ua = headers.get("user-agent") || "";
    if (ua.length > 500 || ua.includes("<?php") || ua.includes("<script>")) {
      return true;
    }

    return false;
  }

  private calculateRiskLevel(
    threats: string[],
    confidence: number
  ): "low" | "medium" | "high" | "critical" {
    const criticalThreats = ["sql_injection", "path_traversal", "parameter_sql_injection"];
    const highThreats = ["xss_attempt", "lms_content_theft", "malicious_bot"];
    const mediumThreats = ["suspicious_parameter_name", "request_anomaly", "header_manipulation"];

    const hasCritical = threats.some(t => criticalThreats.includes(t));
    const hasHigh = threats.some(t => highThreats.includes(t));
    const hasMedium = threats.some(t => mediumThreats.includes(t));

    if (hasCritical || confidence > 80) return "critical";
    if (hasHigh || confidence > 60) return "high";
    if (hasMedium || confidence > 40) return "medium";
    return "low";
  }
}

export const securityScanner = new SecurityScanner();
