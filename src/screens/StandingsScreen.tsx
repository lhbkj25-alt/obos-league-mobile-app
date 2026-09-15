import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { leagueService } from '@services/api';
import { Team } from '@types/index';
import TeamStandingRow from '@components/TeamStandingRow';

const StandingsScreen: React.FC = () => {
  const [standings, setStandings] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStandings();
  }, []);

  const fetchStandings = async () => {
    try {
      setError(null);
      const data = await leagueService.getStandings();
      // Ensure data is sorted by points and goal difference
      const sorted = data.sort(
        (a, b) => b.points - a.points || b.goalDifference - a.goalDifference
      );
      setStandings(sorted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load standings';
      setError(errorMessage);
      console.error('Error in StandingsScreen:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStandings();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading standings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>League Table</Text>
      </View>

      <View style={styles.columnHeaders}>
        <Text style={[styles.columnHeader, styles.posColumn]}>Pos</Text>
        <Text style={[styles.columnHeader, styles.teamColumn]}>Team</Text>
        <Text style={[styles.columnHeader, styles.statColumn]}>P</Text>
        <Text style={[styles.columnHeader, styles.statColumn]}>W-D-L</Text>
        <Text style={[styles.columnHeader, styles.statColumn]}>GD</Text>
        <Text style={[styles.columnHeader, styles.pointsColumn]}>Pts</Text>
      </View>

      <FlatList
        data={standings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeamStandingRow team={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEnabled={false}
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
  columnHeaders: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#999',
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  posColumn: {
    width: 40,
  },
  teamColumn: {
    flex: 1,
  },
  statColumn: {
    width: 35,
    textAlign: 'center',
  },
  pointsColumn: {
    width: 45,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: '600',
  },
});

export default StandingsScreen;
