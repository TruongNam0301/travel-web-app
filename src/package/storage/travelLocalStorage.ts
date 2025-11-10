

import { TravelStorage, type IStorage } from './storage';     


const STORAGE_NAMESPACE = 'travel_app';


export const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export type StorageKeys = (typeof StorageKeys)[keyof typeof StorageKeys];


function getNamespacedKey(key: string): string {
  return `${STORAGE_NAMESPACE}_${key}`;
}

/**
 * Travel Local Storage Class
 * Provides type-safe storage operations with proper namespacing
 */
class TravelLocalStorage {
  private storage: IStorage;

  constructor() {
    this.storage = new TravelStorage();
  }

  /**
   * Get string value from storage
   */
  getString(key: StorageKeys | string): string | null {
    return this.storage.getItem(getNamespacedKey(key));
  }

  /**
   * Set string value in storage
   */
  setString(key: StorageKeys | string, value: string): void {
    this.storage.setItem(getNamespacedKey(key), value);
  }

  /**
   * Get object from storage (parses JSON)
   */
  getObject<T>(key: StorageKeys | string): T | null {
    const value = this.getString(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Failed to parse JSON for key: ${key}`, error);
      return null;
    }
  }

  /**
   * Set object in storage (stringifies to JSON)
   */
  setObject<T>(key: StorageKeys | string, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      this.setString(key, jsonValue);
    } catch (error) {
      console.error(`Failed to stringify value for key: ${key}`, error);
      throw new Error(`Failed to store object for key: ${key}`);
    }
  }

  /**
   * Get boolean value from storage
   */
  getBoolean(key: StorageKeys | string): boolean | null {
    const value = this.getString(key);
    if (value === null) return null;
    return value === 'true';
  }

  /**
   * Set boolean value in storage
   */
  setBoolean(key: StorageKeys | string, value: boolean): void {
    this.setString(key, value.toString());
  }

  /**
   * Get number value from storage
   */
  getNumber(key: StorageKeys | string): number | null {
    const value = this.getString(key);
    if (value === null) return null;

    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  /**
   * Set number value in storage
   */
  setNumber(key: StorageKeys | string, value: number): void {
    this.setString(key, value.toString());
  }

  /**
   * Remove item from storage
   */
  remove(key: StorageKeys | string): void {
    this.storage.removeItem(getNamespacedKey(key));
  }

  /**
   * Check if key exists in storage
   */
  has(key: StorageKeys | string): boolean {
    return this.storage.hasItem(getNamespacedKey(key));
  }

  /**
   * Clear all app-specific items from storage
   * Only removes items with the app namespace
   */
  clearAll(): void {
    const allKeys = this.storage.getAllKeys();
    const appKeys = allKeys.filter((key) => key.startsWith(STORAGE_NAMESPACE));
    appKeys.forEach((key) => this.storage.removeItem(key));
  }

  /**
   * Get all app-specific keys (without namespace prefix)
   */
  getAllKeys(): string[] {
    const allKeys = this.storage.getAllKeys();
    return allKeys
      .filter((key) => key.startsWith(STORAGE_NAMESPACE))
      .map((key) => key.replace(`${STORAGE_NAMESPACE}_`, ''));
  }
}

// Export singleton instance
export const travelLocalStorage = new TravelLocalStorage();

// Export class for testing purposes
export { TravelLocalStorage };

