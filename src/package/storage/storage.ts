
export interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  hasItem(key: string): boolean;
  getAllKeys(): string[];
}


class TravelStorage implements IStorage {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      throw new Error(`Storage write failed for key: ${key}`);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage', error);
    }
  }

  hasItem(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Failed to check item in localStorage: ${key}`, error);
      return false;
    }
  }

  getAllKeys(): string[] {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Failed to get all keys from localStorage', error);
      return [];
    }
  }
}

// Export adapters for testing purposes
export { TravelStorage };

