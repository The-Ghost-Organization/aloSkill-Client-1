/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";
import {
  auditLogger,
  contentValidator,
  rateLimiter,
  securityScanner,
  threatIntelligence,
} from "../lib/security-modules";

// Security configuration
const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMITS: {
    AUTH: { max: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 min
    VIDEO: { max: 20, windowMs: 60 * 1000 }, // 20 requests per minute
    API: { max: 100, windowMs: 60 * 1000 }, // 100 requests per minute
    EXAM: { max: 10, windowMs: 30 * 1000 }, // 10 requests per 30 sec
    DEFAULT: { max: 200, windowMs: 60 * 1000 },
  },

  // Security thresholds
  THREAT_LEVELS: {
    LOW: "log",
    MEDIUM: "challenge",
    HIGH: "block",
    CRITICAL: "block_ban",
  },

  // LMS-specific settings
  LMS: {
    MAX_CONCURRENT_VIDEOS: 3,
    EXAM_ACCESS_WINDOW: 30 * 60 * 1000, // 30 minutes
    VIDEO_TOKEN_EXPIRY: 2 * 60 * 60 * 1000, // 2 hours
  },
};

export default withAuth(
  async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname, searchParams } = request.nextUrl;
    const clientIP = getClientIP(request);
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET as string,
    });
    // const path = request.nextUrl.pathname;

    // Public routes
    if (
      pathname === "/" ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/courses") ||
      pathname.startsWith("/about")
    ) {
      return NextResponse.next();
    }

    // Role-based access control
    if (pathname.startsWith("/dashboard/student") && token?.["role"] !== "STUDENT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (
      pathname.startsWith("/dashboard/instructor") &&
      token?.["role"] !== "INSTRUCTOR" &&
      token?.["role"] !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/admin") && token?.["role"] !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Check account status
    if (token?.["status"] === "SUSPENDED") {
      return NextResponse.redirect(new URL("/account/suspended", request.url));
    }

    if (token?.["status"] === "PENDING_VERIFICATION" && !pathname.startsWith("/verify")) {
      return NextResponse.redirect(new URL("/auth/verify-email", request.url));
    }

    // Start security audit
    const auditId = await auditLogger.startAudit(request);

    try {
      // === PHASE 1: PRE-AUTHENTICATION SECURITY ===

      // 1. Geo-blocking & Regional Compliance
      const geoCheck = await threatIntelligence.checkGeoLocation(request);
      if (!geoCheck.allowed) {
        await auditLogger.logThreat(auditId, "geo_blocked", geoCheck);
        return blockResponse(request, "Service not available in your region", 451);
      }

      // 2. IP Reputation & Threat Intelligence
      const ipReputation = await threatIntelligence.checkIPReputation(clientIP);
      if (ipReputation.riskScore > 70) {
        await auditLogger.logThreat(auditId, "malicious_ip", ipReputation as any);
        return blockResponse(request, "Access denied", 403);
      }

      // 3. Advanced Threat Detection
      const threatScan = await securityScanner.comprehensiveScan(request);
      if (threatScan.isThreat) {
        await handleThreatResponse(threatScan, request, auditId);

        if (threatScan.riskLevel === "critical" || threatScan.riskLevel === "high") {
          return blockResponse(request, "Security threat detected", 403);
        }
      }

      // 4. Multi-layer Rate Limiting
      const rateLimitResult = await rateLimiter.checkMultiLayer(request);
      if (rateLimitResult.blocked) {
        await auditLogger.logThreat(auditId, "rate_limit_exceeded", rateLimitResult as any);
        return new NextResponse("Too Many Requests", {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter,
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          },
        });
      }

      // === PHASE 2: AUTHENTICATION & SESSION SECURITY ===

      // 5. Session Security & Anomaly Detection
      if (token) {
        const sessionCheck = await validateSessionSecurity(token, request);
        if (!sessionCheck.valid) {
          await auditLogger.logThreat(auditId, "session_anomaly", sessionCheck);
          return NextResponse.redirect(
            new URL(`/auth/signout?reason=security&anomaly=${sessionCheck["anomaly"]}`, request.url)
          );
        }

        // Update session activity
        await updateSessionActivity(token, request);
      }

      // 6. Advanced Access Control
      const accessControl = await enforceAccessControl(request, token);
      if (!accessControl.granted) {
        await auditLogger.logAccessViolation(auditId, request, token, accessControl);
        return NextResponse.redirect(new URL(accessControl.redirectUrl, request.url));
      }

      // === PHASE 3: LMS-SPECIFIC CONTENT SECURITY ===

      // 7. Video Content Protection
      if (pathname.includes("/video/")) {
        const videoSecurity = await enforceVideoSecurity(request, token, searchParams);
        if (!videoSecurity.allowed) {
          await auditLogger.logThreat(auditId, "video_access_violation", videoSecurity);
          return blockResponse(request, "Video access denied", 403);
        }

        // Add video-specific security headers
        addVideoSecurityHeaders(response);
      }

      // 8. Document & PDF Protection
      if (pathname.includes("/document/") || pathname.includes("/pdf/")) {
        const documentSecurity = await contentValidator.validateContentAccess(request, token);
        if (!documentSecurity.granted) {
          return NextResponse.redirect(
            new URL("/dashboard?error=document_access_denied", request.url)
          );
        }

        addDocumentSecurityHeaders(response, documentSecurity);
      }

      // 9. Exam & Assessment Security
      if (pathname.includes("/exam/") || pathname.includes("/assessment/")) {
        const examSecurity = await enforceExamSecurity(request, token, searchParams);
        if (!examSecurity.valid) {
          await auditLogger.logThreat(auditId, "exam_security_violation", examSecurity);
          return NextResponse.redirect(new URL("/dashboard?error=exam_access_denied", request.url));
        }

        addExamSecurityHeaders(response);
      }

      // 10. Course Content Access Validation
      if (pathname.startsWith("/learn/") || pathname.startsWith("/course/")) {
        const contentAccess = await contentValidator.validateContentAccess(request, token);
        if (!contentAccess.granted) {
          await auditLogger.logAccessViolation(auditId, request, token, contentAccess);
          return NextResponse.redirect(
            new URL("/dashboard?error=content_access_denied", request.url)
          );
        }
      }

      // === PHASE 4: RESPONSE SECURITY HARDENING ===

      // 11. Advanced Security Headers
      addAdvancedSecurityHeaders(response, request);

      // 12. LMS-Specific Security Headers
      addLMSSpecificHeaders(response, pathname);

      // 13. Real-time Monitoring Headers
      addMonitoringHeaders(response, auditId);

      // Success audit
      await auditLogger.logSuccess(auditId, request, token);

      return response;
    } catch (error) {
      // Security failure handling
      await auditLogger.logError(auditId, error, request);

      // Don't leak error details in production
      if (process.env.NODE_ENV === "production") {
        return new NextResponse("Security verification failed", { status: 500 });
      }

      throw error;
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const isPublicRoute =
          path === "/" ||
          path.startsWith("/auth") ||
          path.startsWith("/courses") ||
          path.startsWith("/about");

        if (isPublicRoute) {
          return true;
        }

        return !!token;
      },
    },
  }
);

// === SECURITY MODULE IMPLEMENTATIONS ===

/**
 * Advanced Session Security Validation
 */
async function validateSessionSecurity(
  token: any,
  request: NextRequest
): Promise<SessionValidationResult> {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get("user-agent");
  const now = Date.now();

  // Check for session anomalies
  const anomalies: string[] = [];

  // 1. IP Address Change Detection
  if (token.sessionIP && token.sessionIP !== clientIP) {
    anomalies.push("ip_change");
  }

  // 2. User Agent Change Detection
  if (token.sessionUA && token.sessionUA !== userAgent) {
    anomalies.push("user_agent_change");
  }

  // 3. Session Age Check
  if (token.iat && now - token.iat * 1000 > 24 * 60 * 60 * 1000) {
    anomalies.push("session_expired");
  }

  // 4. Concurrent Session Check
  const concurrentSessions = await checkConcurrentSessions(token.id);
  if (concurrentSessions > 3) {
    anomalies.push("concurrent_sessions");
  }

  // 5. Geographic Anomaly Detection
  const geoAnomaly = await detectGeographicAnomaly(token, request);
  if (geoAnomaly.detected) {
    anomalies.push("geographic_anomaly");
  }

  return {
    valid: anomalies.length === 0,
    anomalies,
    riskLevel: anomalies.length > 2 ? "high" : anomalies.length > 0 ? "medium" : "low",
  };
}

/**
 * Advanced Access Control for LMS
 */
async function enforceAccessControl(
  request: NextRequest,
  token: any
): Promise<AccessControlResult> {
  const { pathname, searchParams } = request.nextUrl;

  // Public routes (no authentication required)
  const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/pricing", "/courses", "/blog"];
  if (publicRoutes.includes(pathname)) {
    return { granted: true, redirectUrl: "" };
  }

  // Authentication required
  if (!token) {
    return {
      granted: false,
      redirectUrl: `/auth/signin?returnUrl=${encodeURIComponent(pathname)}`,
      reason: "authentication_required",
    };
  }

  // Role-based access control
  const userRole = token.role || "student";

  // Admin routes
  if (pathname.startsWith("/admin/")) {
    if (userRole !== "admin") {
      return {
        granted: false,
        redirectUrl: "/dashboard?error=admin_access_required",
        reason: "insufficient_privileges",
      };
    }
  }

  // Instructor routes
  if (pathname.startsWith("/instructor/")) {
    if (!["instructor", "admin"].includes(userRole)) {
      return {
        granted: false,
        redirectUrl: "/dashboard?error=instructor_access_required",
        reason: "insufficient_privileges",
      };
    }
  }

  // Student routes with enrollment checks
  if (pathname.startsWith("/learn/") || pathname.startsWith("/course/")) {
    const courseId = extractCourseId(pathname) || searchParams.get("courseId");
    if (courseId && !(await isUserEnrolled(token.id, courseId))) {
      return {
        granted: false,
        redirectUrl: "/dashboard?error=course_not_enrolled",
        reason: "course_access_denied",
      };
    }
  }

  // Time-based access control for exams
  if (pathname.includes("/exam/")) {
    const examAccess = await validateExamTimeAccess(token.id, pathname);
    if (!examAccess.valid) {
      return {
        granted: false,
        redirectUrl: `/dashboard?error=exam_${examAccess.reason}`,
        reason: "exam_access_restricted",
      };
    }
  }

  return { granted: true, redirectUrl: "" };
}

/**
 * Advanced Video Content Security
 */
async function enforceVideoSecurity(
  request: NextRequest,
  token: any,
  searchParams: URLSearchParams
): Promise<VideoSecurityResult> {
  const { pathname } = request.nextUrl;

  if (!token) {
    return { allowed: false, reason: "authentication_required" };
  }

  // Extract video and course information
  const videoId = extractVideoId(pathname);
  const courseId = extractCourseId(pathname) || searchParams.get("courseId");

  if (!videoId || !courseId) {
    return { allowed: false, reason: "invalid_video_reference" };
  }

  // 1. Course enrollment check
  if (!(await isUserEnrolled(token.id, courseId))) {
    return { allowed: false, reason: "course_not_enrolled" };
  }

  // 2. Video access permissions
  if (!(await hasVideoAccess(token.id, videoId, courseId))) {
    return { allowed: false, reason: "video_access_denied" };
  }

  // 3. Concurrent video stream limit
  const concurrentStreams = await getConcurrentVideoStreams(token.id);
  if (concurrentStreams >= SECURITY_CONFIG.LMS.MAX_CONCURRENT_VIDEOS) {
    return { allowed: false, reason: "concurrent_stream_limit" };
  }

  // 4. Geographic video restrictions
  const geoRestriction = await checkVideoGeoRestriction(videoId, request);
  if (!geoRestriction.allowed) {
    return { allowed: false, reason: "geo_restricted" };
  }

  // 5. Video token validation (for signed URLs)
  if (searchParams.has("token")) {
    const tokenValid = await validateVideoToken(
      searchParams.get("token") as string,
      videoId,
      token.id
    );
    if (!tokenValid) {
      return { allowed: false, reason: "invalid_video_token" };
    }
  }

  // 6. Download prevention
  if (isDownloadAttempt(request)) {
    return { allowed: false, reason: "download_attempt" };
  }

  // Track video access
  await trackVideoAccess(token.id, videoId, courseId, request);

  return { allowed: true, videoId, courseId };
}

/**
 * Exam & Assessment Security
 */
async function enforceExamSecurity(
  request: NextRequest,
  token: any,
  searchParams: URLSearchParams
): Promise<ExamSecurityResult> {
  const { pathname } = request.nextUrl;

  if (!token) {
    return { valid: false, reason: "authentication_required" };
  }

  const examId = extractExamId(pathname) || searchParams.get("examId");
  if (!examId) {
    return { valid: false, reason: "invalid_exam_reference" };
  }

  // 1. Exam enrollment and access period
  const examAccess = await validateExamAccess(token.id, examId);
  if (!examAccess.canAccess) {
    return { valid: false, reason: examAccess.reason as string };
  }

  // 2. Time window validation
  if (!(await isWithinExamWindow(examId))) {
    return { valid: false, reason: "exam_window_closed" };
  }

  // 3. Attempt limit check
  const attempts = await getExamAttempts(token.id, examId);
  if (attempts >= examAccess.maxAttempts) {
    return { valid: false, reason: "attempt_limit_exceeded" };
  }

  // 4. Anti-cheating measures
  const cheatingDetection = await detectCheatingBehavior(request, token.id, examId);
  if (cheatingDetection.suspicious) {
    await flagSuspiciousExamActivity(token.id, examId, cheatingDetection);
    return { valid: false, reason: "suspicious_activity" };
  }

  // 5. Secure browser requirements
  if (!hasSecureBrowser(request)) {
    return { valid: false, reason: "insecure_browser" };
  }

  return { valid: true, examId, attemptNumber: attempts + 1 };
}

// === SECURITY HEADERS IMPLEMENTATION ===

function addAdvancedSecurityHeaders(response: NextResponse, _request: NextRequest) {
  // Content Security Policy with LMS-specific directives
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "media-src 'self' blob: https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "block-all-mixed-content",
    "upgrade-insecure-requests",
  ];

  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // HSTS in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }
}

function addVideoSecurityHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("X-Accel-Expires", "0");
  response.headers.set("Accept-Ranges", "bytes");
  response.headers.set("X-Content-Duration", "true");
}

function addDocumentSecurityHeaders(response: NextResponse, security: any) {
  response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
  response.headers.set("X-Content-Type-Options", "nosniff");

  if (security.watermark) {
    response.headers.set("X-Document-Watermark", security.watermark);
  }

  // Force download for sensitive documents
  if (security.forceDownload) {
    response.headers.set("Content-Disposition", `attachment; filename="${security.filename}"`);
  }
}

function addExamSecurityHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
  response.headers.set("X-Exam-Secure", "true");
  response.headers.set("X-Frame-Options", "SAMEORIGIN"); // Allow same-origin for exam iframes
}

function addLMSSpecificHeaders(response: NextResponse, pathname: string) {
  // Add LMS-specific security headers
  response.headers.set("X-LMS-Security", "enabled");
  response.headers.set("X-Content-Protection", "active");

  if (pathname.includes("/video/") || pathname.includes("/document/")) {
    response.headers.set("X-Content-Owner", "protected");
  }
}

function addMonitoringHeaders(response: NextResponse, auditId: string) {
  response.headers.set("X-Security-Audit-ID", auditId);
  response.headers.set("X-Security-Level", "high");
}

// === HELPER FUNCTIONS ===

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  const forwardedIp = forwarded?.split(",")[0]?.trim() || "";

  return cfConnectingIP || forwardedIp || realIP || "unknown";
}

function blockResponse(request: NextRequest, message: string, status: number = 403): NextResponse {
  const clientIP = getClientIP(request);

  console.warn("SECURITY_BLOCK:", {
    timestamp: new Date().toISOString(),
    ip: clientIP,
    path: request.nextUrl.pathname,
    reason: message,
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
  });

  return new NextResponse(message, {
    status,
    headers: {
      "X-Blocked-Reason": message,
      "X-Blocked-By": "Security-Middleware",
    },
  });
}

async function handleThreatResponse(threatScan: any, request: NextRequest, auditId: string) {
  // Implement different responses based on threat level
  switch (threatScan.riskLevel) {
    case "critical":
      // Immediate block and ban
      await threatIntelligence.banIP(getClientIP(request), "critical_threat");
      break;
    case "high":
      // Block request
      break;
    case "medium":
      // Challenge request (could implement CAPTCHA)
      break;
    case "low":
      // Log only
      console.log("Low level threat detected:", threatScan);
      break;
  }
}

// === PLACEHOLDER IMPLEMENTATIONS - REPLACE WITH YOUR ACTUAL LOGIC ===

async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  // Implement your course enrollment check
  return true;
}

async function hasVideoAccess(userId: string, videoId: string, courseId: string): Promise<boolean> {
  // Implement video access check
  return true;
}

async function checkConcurrentSessions(userId: string): Promise<number> {
  // Implement concurrent session check
  return 1;
}

async function detectGeographicAnomaly(
  token: any,
  request: NextRequest
): Promise<{ detected: boolean; reason?: string }> {
  // Implement geographic anomaly detection
  return { detected: false };
}

async function updateSessionActivity(token: any, request: NextRequest) {
  // Update session activity timestamp
}

async function validateExamAccess(
  userId: string,
  examId: string
): Promise<{ canAccess: boolean; reason?: string; maxAttempts: number }> {
  // Implement exam access validation
  return { canAccess: true, maxAttempts: 3 };
}

async function isWithinExamWindow(examId: string): Promise<boolean> {
  // Check if current time is within exam window
  return true;
}

async function getExamAttempts(userId: string, examId: string): Promise<number> {
  // Get number of exam attempts
  return 0;
}

async function detectCheatingBehavior(
  request: NextRequest,
  userId: string,
  examId: string
): Promise<{ suspicious: boolean; indicators: string[] }> {
  // Implement cheating detection logic
  return { suspicious: false, indicators: [] };
}

function hasSecureBrowser(request: NextRequest): boolean {
  // Check for secure browser requirements
  return true;
}

async function flagSuspiciousExamActivity(userId: string, examId: string, detection: any) {
  // Flag suspicious activity
}

async function checkVideoGeoRestriction(
  videoId: string,
  request: NextRequest
): Promise<{ allowed: boolean; reason?: string }> {
  // Check geographic restrictions for video
  return { allowed: true };
}

async function validateVideoToken(
  token: string,
  videoId: string,
  userId: string
): Promise<boolean> {
  // Validate video access token
  return true;
}

function isDownloadAttempt(request: NextRequest): boolean {
  // Detect video download attempts
  const userAgent = request.headers.get("user-agent") || "";
  return userAgent.includes("ffmpeg") || userAgent.includes("youtube-dl");
}

async function trackVideoAccess(
  userId: string,
  videoId: string,
  courseId: string,
  request: NextRequest
) {
  // Track video access for analytics and security
}

function extractCourseId(pathname: string): string | null {
  const match = pathname.match(/\/(course|learn)\/([^\/]+)/);
  return match ? match[2] || null : null;
}

function extractVideoId(pathname: string): string | null {
  const match = pathname.match(/\/video\/([^\/]+)/);
  return match ? match[1] || null : null;
}

function extractExamId(pathname: string): string | null {
  const match = pathname.match(/\/(exam|assessment)\/([^\/]+)/);
  return match ? match[2] || null : null;
}

async function validateExamTimeAccess(
  userId: string,
  pathname: string
): Promise<{ valid: boolean; reason?: string }> {
  // Validate exam time-based access
  return { valid: true };
}

async function getConcurrentVideoStreams(userId: string): Promise<number> {
  // Get number of concurrent video streams
  return 1;
}

// === TYPE DEFINITIONS ===

interface SessionValidationResult {
  [x: string]: any;
  valid: boolean;
  anomalies: string[];
  riskLevel: "low" | "medium" | "high";
}

interface AccessControlResult {
  granted: boolean;
  redirectUrl: string;
  reason?: string;
}

interface VideoSecurityResult {
  allowed: boolean;
  reason?: string;
  videoId?: string;
  courseId?: string;
}

interface ExamSecurityResult {
  valid: boolean;
  reason?: string;
  examId?: string;
  attemptNumber?: number;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth).*)"],
};
