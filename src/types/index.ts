export interface Team {
  id: string;
  name: string;
  logo: string;
  position: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: 'scheduled' | 'live' | 'finished';
  kickOffTime: string;
  venue?: string;
}

export interface FavoriteTeam {
  teamId: string;
  addedAt: string;
}

export interface AppState {
  favoriteTeams: FavoriteTeam[];
  addFavoriteTeam: (teamId: string) => void;
  removeFavoriteTeam: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
}
