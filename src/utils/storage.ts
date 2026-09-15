import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'obos_favorite_teams';
const CACHE_PREFIX = 'obos_cache_';

export const storageService = {
  // Favorites
  async saveFavorites(teamIds: string[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(teamIds));
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw new Error('Failed to save favorites');
    }
  },

  async getFavorites(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      throw new Error('Failed to load favorites');
    }
  },

  async clearFavorites(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
      throw new Error('Failed to clear favorites');
    }
  },

  // Cache
  async setCache(key: string, data: unknown, ttlMinutes: number = 30): Promise<void> {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60 * 1000,
      };
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  },

  async getCache(key: string): Promise<unknown | null> {
    try {
      const cacheKey = `${CACHE_PREFIX}${key}`;
      const data = await AsyncStorage.getItem(cacheKey);
      if (!data) return null;

      const cacheData = JSON.parse(data);
      const now = Date.now();
      const isExpired = now - cacheData.timestamp > cacheData.ttl;

      if (isExpired) {
        await AsyncStorage.removeItem(cacheKey);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  },

  async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
};

export default storageService;
