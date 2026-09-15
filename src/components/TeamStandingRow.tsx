import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Team } from '@types/index';

interface TeamStandingRowProps {
  team: Team;
}

type RootStackParamList = {
  TeamDetail: { teamId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TeamStandingRow: React.FC<TeamStandingRowProps> = ({ team }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('TeamDetail', { teamId: team.id });
  };

  const getPositionColor = (pos: number): string => {
    if (pos <= 2) return '#4caf50'; // Green - European spots
    if (pos <= 6) return '#2196f3'; // Blue
    if (pos <= 14) return '#9c27b0'; // Purple - Mid table
    return '#f44336'; // Red - Relegation zone
  };

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.positionBox, { backgroundColor: getPositionColor(team.position) }]}>
        <Text style={styles.position}>{team.position}</Text>
      </View>
      <View style={styles.teamInfo}>
        <Text style={styles.logo}>{team.logo || '⚽'}</Text>
        <Text style={styles.teamName} numberOfLines={1}>
          {team.name}
        </Text>
      </View>
      <Text style={styles.stat}>{team.played}</Text>
      <Text style={styles.stat}>
        {team.wins}-{team.draws}-{team.losses}
      </Text>
      <Text style={[styles.stat, { color: team.goalDifference >= 0 ? '#4caf50' : '#f44336' }]}>
        {team.goalDifference >= 0 ? '+' : ''}{team.goalDifference}
      </Text>
      <Text style={styles.points}>{team.points}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  positionBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  position: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    fontSize: 20,
    marginRight: 8,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  stat: {
    fontSize: 12,
    fontWeight: '600',
    width: 35,
    textAlign: 'center',
    color: '#666',
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 45,
    textAlign: 'center',
    color: '#0066cc',
  },
});

export default TeamStandingRow;
