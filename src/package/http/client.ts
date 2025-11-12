import { type AxiosRequestConfig } from "axios";  
import { axiosInstance } from "./axios.instance";
import type { ApiResponse } from "./types";


class HttpClient {
  private instance;

  constructor() {
    this.instance = axiosInstance;
  }

  getInstance() {
    return this.instance;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    // The interceptor returns the full BaseResponseDto, extract data field
    return response.data as T;
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    // The interceptor returns the full BaseResponseDto, extract data field
    return response.data as T;
  }


  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    // The interceptor returns the full BaseResponseDto, extract data field
    return response.data as T;
  }


  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    // The interceptor returns the full BaseResponseDto, extract data field
    return response.data as T;
  }


  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    // The interceptor returns the full BaseResponseDto, extract data field
    return response.data as T;
  }

  /**
   * Get full response with metadata (success, statusCode, message, timestamp, path, method)
   * Useful when you need access to response metadata
   */
  async getFullResponse<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    // The interceptor returns the full BaseResponseDto structure
    return response as unknown as ApiResponse<T>;
  }

  /**
   * Post and get full response with metadata
   */
  async postFullResponse<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    // The interceptor returns the full BaseResponseDto structure
    return response as unknown as ApiResponse<T>;
  }


  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }


  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }


  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }
}

export const httpClient = new HttpClient();

