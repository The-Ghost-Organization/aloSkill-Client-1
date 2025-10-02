// lib/api/client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000/api"

interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: any[]
}

interface RequestOptions extends RequestInit {
  token?: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { token, ...fetchOptions } = options

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    }

    // Add authorization token if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Request failed",
          errors: data.errors || [],
        }
      }

      return {
        success: true,
        ...data,
      }
    } catch (error) {
      console.error("API request error:", error)
      return {
        success: false,
        message: "Network error. Please check your connection.",
      }
    }
  }

  // GET request
  async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      token,
    })
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      token,
    })
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      token,
    })
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      token,
    })
  }

  // DELETE request
  async delete<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {method: "DELETE",
      token,
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL)

// Export base URL for other uses
export { API_BASE_URL }