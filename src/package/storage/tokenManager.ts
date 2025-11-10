
import { TravelStorage, type IStorage } from "./storage";
import { STORAGE_KEYS } from "./storage.constants";




class TokenManager {
  private storage: IStorage;

  constructor() {
    this.storage = new TravelStorage();
  }


  setTokens(accessToken: string, refreshToken: string): void {
    this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    this.storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify({ refreshToken }));
  }


  getAccessToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }


  getRefreshToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }


  getTokens(): { accessToken: string | null; refreshToken: string | null } | null {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }


  setAccessToken(accessToken: string): void {
    this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }


  setRefreshToken(refreshToken: string): void {
    this.storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify({ refreshToken }));
  }


  clearTokens(): void {
    this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }


  hasTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }


  isAuthenticated(): boolean {
    return this.hasTokens();
  }


  private decodeToken(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }


  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded || typeof decoded.exp !== 'number') return true;

    // Check if token expires in the next 5 minutes (300 seconds)
    // This gives us a buffer to refresh before actual expiration
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationBuffer = 300; // 5 minutes
    return decoded.exp < currentTime + expirationBuffer;
  }

  /**
   * Get token expiration time
   * @returns Expiration timestamp in seconds or null if invalid
   */
  getAccessTokenExpiration(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded || typeof decoded.exp !== 'number') return null;

    return decoded.exp;
  }

  /**
   * Get user ID from access token
   * @returns User ID or null if not found
   */
  getUserIdFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded || typeof decoded.sub !== 'string') return null;

    return decoded.sub;
  }

  /**
   * Get user role from access token
   * @returns User role or null if not found
   */
  getUserRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded || typeof decoded.role !== 'string') return null;

    return decoded.role;
  }
}

// Export singleton instance
export const tokenManager = new TokenManager();

// Export class for testing purposes
export { TokenManager };

