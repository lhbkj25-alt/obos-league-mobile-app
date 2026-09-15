import useAppStore from '@/store';

describe('App Store', () => {
  beforeEach(() => {
    useAppStore.setState({ favoriteTeams: [] });
  });

  test('should add favorite team', () => {
    const { addFavoriteTeam, favoriteTeams } = useAppStore.getState();
    addFavoriteTeam('team-1');
    expect(useAppStore.getState().favoriteTeams).toHaveLength(1);
    expect(useAppStore.getState().favoriteTeams[0].teamId).toBe('team-1');
  });

  test('should remove favorite team', () => {
    const { addFavoriteTeam, removeFavoriteTeam } = useAppStore.getState();
    addFavoriteTeam('team-1');
    addFavoriteTeam('team-2');
    removeFavoriteTeam('team-1');
    expect(useAppStore.getState().favoriteTeams).toHaveLength(1);
    expect(useAppStore.getState().favoriteTeams[0].teamId).toBe('team-2');
  });

  test('should check if team is favorite', () => {
    const { addFavoriteTeam, isFavorite } = useAppStore.getState();
    addFavoriteTeam('team-1');
    expect(isFavorite('team-1')).toBe(true);
    expect(isFavorite('team-2')).toBe(false);
  });
});
