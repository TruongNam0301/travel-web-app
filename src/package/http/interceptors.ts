import { useAuthStore } from '@/core/stores'
import type { AxiosInstance } from 'axios'
import { TokenManager } from '../storage'

let isRefreshing = false
let failedQueue: {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

const redirectToLogin = () => {
  TokenManager.clearTokens()
  useAuthStore.getState().clearUser()
  window.location.href = '/login'
}

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor - Add auth token
  axiosInstance.interceptors.request.use((config) => {
    const token = TokenManager.getAccessToken()

    if (
      token &&
      !config.headers.Authorization &&
      config.url !== '/auth/refresh'
    )
      config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // Response interceptor - Handle errors and token refresh
  axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const originalRequest = error.config

      if (originalRequest.url === '/auth/refresh') {
        redirectToLogin()
        return Promise.reject(error)
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject })
            })
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axiosInstance(originalRequest)
          } catch (err) {
            return Promise.reject(err)
          }
        }

        originalRequest._retry = true
        isRefreshing = true

        const refreshToken = TokenManager.getRefreshToken()
        if (!refreshToken) {
          redirectToLogin()
          return Promise.reject(error)
        }

        try {
          const res = await axiosInstance.post(
            '/auth/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          const { accessToken, refreshToken: newRefresh } = res.data
          TokenManager.saveTokens(accessToken, newRefresh)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          processQueue(null, accessToken)
          return axiosInstance(originalRequest)
        } catch (err) {
          processQueue(err, null)
          redirectToLogin()
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      // Check if the error response already has the BaseResponseDto structure
      if (
        error.response?.data &&
        typeof error.response.data === 'object' &&
        'success' in error.response.data
      ) {
        // Backend already sent a properly formatted error response
        return Promise.reject(error.response.data)
      }

      // Fallback: Standardized error object for unexpected errors
      const formattedError = {
        success: false,
        statusCode: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          error.message ||
          'Unexpected error occurred',
        path: error.config?.url || 'unknown',
        method: error.config?.method?.toUpperCase() || 'UNKNOWN',
        timestamp: new Date().toISOString(),
        error: error.response?.data?.error || { details: error.message },
      }

      return Promise.reject(formattedError)
    }
  )
}
