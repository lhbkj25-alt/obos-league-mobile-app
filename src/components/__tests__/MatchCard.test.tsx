import React from 'react';
import { render } from '@testing-library/react-native';
import MatchCard from '../MatchCard';
import { Match } from '@types/index';

const mockTeam = {
  id: 'team-1',
  name: 'Team A',
  logo: '⚽',
  position: 1,
  played: 10,
  wins: 8,
  draws: 1,
  losses: 1,
  goalsFor: 25,
  goalsAgainst: 8,
  goalDifference: 17,
  points: 25,
};

const mockMatch: Match = {
  id: 'match-1',
  homeTeam: mockTeam,
  awayTeam: { ...mockTeam, id: 'team-2', name: 'Team B' },
  homeScore: 2,
  awayScore: 1,
  status: 'finished',
  kickOffTime: new Date().toISOString(),
};

describe('MatchCard', () => {
  test('renders match card with score', () => {
    const { getByText } = render(<MatchCard match={mockMatch} />);
    expect(getByText('Team A')).toBeTruthy();
    expect(getByText('Team B')).toBeTruthy();
    expect(getByText('2 - 1')).toBeTruthy();
  });

  test('renders finished status', () => {
    const { getByText } = render(<MatchCard match={mockMatch} />);
    expect(getByText('FINISHED')).toBeTruthy();
  });

  test('renders live status with different styling', () => {
    const liveMatch = { ...mockMatch, status: 'live' as const };
    const { getByText } = render(<MatchCard match={liveMatch} />);
    expect(getByText(/LIVE/)).toBeTruthy();
  });
});
