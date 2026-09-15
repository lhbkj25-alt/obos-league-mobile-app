import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAppStore from '@/store';
import { leagueService } from '@services/api';
import { Team, Match } from '@types/index';
import MatchCard from '@components/MatchCard';

interface RootStackParamList {
  TeamDetail: { teamId: string };
}

type TeamDetailScreenRouteProp = RouteProp<RootStackParamList, 'TeamDetail'>;
type TeamDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  route: TeamDetailScreenRouteProp;
  navigation: TeamDetailScreenNavigationProp;
}

const TeamDetailScreen: React.FC<Props> = ({ route }) => {
  const { teamId } = route.params;
  const [team, setTeam] = useState<Team | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = useAppStore((state) => state.isFavorite(teamId));
  const addFavorite = useAppStore((state) => state.addFavoriteTeam);
  const removeFavorite = useAppStore((state) => state.removeFavoriteTeam);

  useEffect(() => {
    fetchTeamData();
  }, [teamId]);

  const fetchTeamData = async () => {
    try {
      setError(null);
      const [teamData, matchData] = await Promise.all([
        leagueService.getTeamDetails(teamId),
        leagueService.getTeamMatches(teamId),
      ]);
      setTeam(teamData);
      setMatches(matchData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load team details';
      setError(errorMessage);
      console.error('Error in TeamDetailScreen:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(teamId);
      Alert.alert('Removed', 'Team removed from favorites');
    } else {
      addFavorite(teamId);
      Alert.alert('Added', 'Team added to favorites');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error || !team) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error || 'Team not found'}</Text>
      </View>
    );
  }

  const winRate = team.played > 0 ? ((team.wins / team.played) * 100).toFixed(1) : '0';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.teamLogo}>{team.logo || '⚽'}</Text>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.teamPosition}>Position: {team.position}</Text>
      </View>

      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={toggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? '⭐ Remove from Favorites' : '☆ Add to Favorites'}
        </Text>
      </TouchableOpacity>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statValue}>{team.points}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Played</Text>
          <Text style={styles.statValue}>{team.played}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Win Rate</Text>
          <Text style={styles.statValue}>{winRate}%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Goal Diff</Text>
          <Text style={styles.statValue}>{team.goalDifference}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Record</Text>
        <View style={styles.recordContainer}>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>W</Text>
            <Text style={styles.recordValue}>{team.wins}</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>D</Text>
            <Text style={styles.recordValue}>{team.draws}</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>L</Text>
            <Text style={styles.recordValue}>{team.losses}</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>GF</Text>
            <Text style={styles.recordValue}>{team.goalsFor}</Text>
          </View>
          <View style={styles.recordItem}>
            <Text style={styles.recordLabel}>GA</Text>
            <Text style={styles.recordValue}>{team.goalsAgainst}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Matches</Text>
        {matches.length > 0 ? (
          matches.slice(0, 5).map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <Text style={styles.noDataText}>No matches available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#0066cc',
    paddingVertical: 30,
    alignItems: 'center',
  },
  teamLogo: {
    fontSize: 60,
    marginBottom: 12,
  },
  teamName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  teamPosition: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  favoriteButton: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0066cc',
  },
  favoriteButtonActive: {
    backgroundColor: '#fff9c4',
    borderColor: '#ffd700',
  },
  favoriteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066cc',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  statCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  recordItem: {
    alignItems: 'center',
  },
  recordLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  recordValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
    marginTop: 4,
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
  },
});

export default TeamDetailScreen;
