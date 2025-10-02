// lib/auth/token.ts

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const USER_DATA_KEY = "user_data"

export interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  status: string
  isEmailVerified: boolean
  profilePicture?: string
}

class TokenManager {
  // Store tokens in localStorage (client-side only)
  private isClient = typeof window !== "undefined"

  // === ACCESS TOKEN ===
  setAccessToken(token: string): void {
    if (this.isClient) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
    }
  }

  getAccessToken(): string | null {
    if (this.isClient) {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    }
    return null
  }

  removeAccessToken(): void {
    if (this.isClient) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  }

  // === REFRESH TOKEN ===
  setRefreshToken(token: string): void {
    if (this.isClient) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token)
    }
  }

  getRefreshToken(): string | null {
    if (this.isClient) {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    }
    return null
  }

  removeRefreshToken(): void {
    if (this.isClient) {
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }

  // === USER DATA ===
  setUserData(user: UserData): void {
    if (this.isClient) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
    }
  }

  getUserData(): UserData | null {
    if (this.isClient) {
      const data = localStorage.getItem(USER_DATA_KEY)
      return data ? JSON.parse(data) : null
    }
    return null
  }

  removeUserData(): void {
    if (this.isClient) {
      localStorage.removeItem(USER_DATA_KEY)
    }
  }

  // === COMBINED OPERATIONS ===
  setAuth(accessToken: string, refreshToken: string, user: UserData): void {
    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
    this.setUserData(user)
  }

  clearAuth(): void {
    this.removeAccessToken()
    this.removeRefreshToken()
    this.removeUserData()
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  // Decode JWT (basic - without verification)
  decodeToken(token: string): any {
    try {
      const payload = token.split(".")[1]
      return JSON.parse(atob(payload))
    } catch (error) {
      console.error("Failed to decode token:", error)
      return null
    }
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token)
    if (!decoded || !decoded.exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  }

  // Check if access token needs refresh
  needsRefresh(): boolean {
    const accessToken = this.getAccessToken()
    if (!accessToken) return false

    const decoded = this.decodeToken(accessToken)
    if (!decoded || !decoded.exp) return true

    // Refresh if token expires in less than 5 minutes
    const currentTime = Math.floor(Date.now() / 1000)
    const timeUntilExpiry = decoded.exp - currentTime
    return timeUntilExpiry < 300 // 5 minutes
  }
}

// Export singleton instance
export const tokenManager = new TokenManager()

// Export token keys for reference
export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY }