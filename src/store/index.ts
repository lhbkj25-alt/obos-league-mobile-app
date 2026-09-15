import { create } from 'zustand';
import { AppState, FavoriteTeam } from '@types/index';

const useAppStore = create<AppState>((set, get) => ({
  favoriteTeams: [],

  addFavoriteTeam: (teamId: string) => {
    set((state) => ({
      favoriteTeams: [
        ...state.favoriteTeams,
        { teamId, addedAt: new Date().toISOString() },
      ],
    }));
  },

  removeFavoriteTeam: (teamId: string) => {
    set((state) => ({
      favoriteTeams: state.favoriteTeams.filter((team) => team.teamId !== teamId),
    }));
  },

  isFavorite: (teamId: string) => {
    const state = get();
    return state.favoriteTeams.some((team) => team.teamId === teamId);
  },
}));

export default useAppStore;
