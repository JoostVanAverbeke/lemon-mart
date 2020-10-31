/**
 * Abstract class that provides methods to cache key value pairs in the localSorage.
 */
export abstract class CacheService {
  /**
   * Gets the data item with the specified key from the web storage localStorage.
   * @param key the key of the data item
   * @return the data item or null if the key doesn't exist in the localStorage
   */
  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * It is used both to create new data items in the localStorage, and
   * (if the data item already exists) update existing values.
   * @param key the key of the data item to create/modify
   * @param data the data to store
   * @return void
   */
  protected setItem(key: string, data: object | string): void {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  /**
   * Removes the item with the specified key from the localStorage.
   * @param key the key of the data item you want to remove in the localStorage
   * @return void
   */
  protected removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Removes the entire localStorage.
   * @return void
   */
  protected clear(): void {
    localStorage.clear();
  }
}
