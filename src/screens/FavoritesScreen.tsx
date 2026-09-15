import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useAppStore from '@/store';
import { leagueService } from '@services/api';
import { Team } from '@types/index';
import TeamCard from '@components/TeamCard';

const FavoritesScreen: React.FC = () => {
  const favoriteTeams = useAppStore((state) => state.favoriteTeams);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (favoriteTeams.length > 0) {
        fetchFavoriteTeams();
      }
    }, [favoriteTeams])
  );

  const fetchFavoriteTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const allTeams = await leagueService.getStandings();
      const favoredIds = new Set(favoriteTeams.map((ft) => ft.teamId));
      const filtered = allTeams.filter((team) => favoredIds.has(team.id));
      setTeams(filtered);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load teams';
      setError(errorMessage);
      console.error('Error in FavoritesScreen:', err);
    } finally {
      setLoading(false);
    }
  };

  if (favoriteTeams.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorite Teams</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Add your favorite teams to follow them closely
          </Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchFavoriteTeams}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Teams</Text>
        <Text style={styles.count}>{teams.length} team(s)</Text>
      </View>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeamCard team={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
    padding: 20,
  },
  header: {
    backgroundColor: '#0066cc',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FavoritesScreen;
