import { storageService } from '../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Favorites', () => {
    test('should save favorites', async () => {
      const teamIds = ['team-1', 'team-2'];
      await storageService.saveFavorites(teamIds);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'obos_favorite_teams',
        JSON.stringify(teamIds)
      );
    });

    test('should get favorites', async () => {
      const teamIds = ['team-1', 'team-2'];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(teamIds));
      const result = await storageService.getFavorites();
      expect(result).toEqual(teamIds);
    });

    test('should return empty array when no favorites', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await storageService.getFavorites();
      expect(result).toEqual([]);
    });
  });

  describe('Cache', () => {
    test('should set cache with expiration', async () => {
      const data = { test: 'data' };
      await storageService.setCache('key', data, 30);
      const call = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
      expect(call[0]).toBe('obos_cache_key');
      expect(JSON.parse(call[1])).toHaveProperty('data', data);
    });

    test('should return null for expired cache', async () => {
      const expiredData = {
        data: { test: 'data' },
        timestamp: Date.now() - 60 * 60 * 1000, // 1 hour ago
        ttl: 30 * 60 * 1000, // 30 minutes
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(expiredData));
      const result = await storageService.getCache('key');
      expect(result).toBeNull();
    });
  });
});
