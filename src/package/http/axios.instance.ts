import type { HttpClientConfig } from "./types";
import axios, { type AxiosInstance } from "axios";
import { setupInterceptors } from "./interceptors";

const DEFAULT_CONFIG: HttpClientConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  };
  

export const axiosInstance: AxiosInstance = axios.create(DEFAULT_CONFIG);

// Setup interceptors after instance creation
setupInterceptors(axiosInstance);