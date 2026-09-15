import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Team } from '@types/index';

interface TeamCardProps {
  team: Team;
}

type RootStackParamList = {
  TeamDetail: { teamId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('TeamDetail', { teamId: team.id });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>{team.logo || '⚽'}</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.position}>#{team.position}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statValue}>{team.points}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Played</Text>
          <Text style={styles.statValue}>{team.played}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>W-D-L</Text>
          <Text style={styles.statValue}>
            {team.wins}-{team.draws}-{team.losses}
          </Text>
        </View>
      </View>

      <View style={styles.goalRow}>
        <Text style={styles.goalText}>
          Goals: {team.goalsFor} For, {team.goalsAgainst} Against
        </Text>
        <Text
          style={[
            styles.goalDiff,
            { color: team.goalDifference >= 0 ? '#4caf50' : '#f44336' },
          ]}
        >
          {team.goalDifference >= 0 ? '+' : ''}{team.goalDifference}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    fontSize: 40,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  position: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066cc',
    marginTop: 2,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  goalText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  goalDiff: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TeamCard;
