import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Match } from '@types/index';

interface MatchCardProps {
  match: Match;
  onPress?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.statusBadge, isLive && styles.liveBadge]}>
        <Text style={styles.statusText}>
          {isLive ? '🔴 LIVE' : isFinished ? 'FINISHED' : 'SCHEDULED'}
        </Text>
      </View>

      <View style={styles.matchContent}>
        <View style={styles.teamSection}>
          <Text style={styles.teamName}>{match.homeTeam.name}</Text>
          <Text style={styles.logo}>{match.homeTeam.logo}</Text>
        </View>

        <View style={styles.scoreSection}>
          {match.homeScore !== null && match.awayScore !== null ? (
            <Text style={styles.score}>
              {match.homeScore} - {match.awayScore}
            </Text>
          ) : (
            <Text style={styles.time}>
              {new Date(match.kickOffTime).toLocaleTimeString('no-NO', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>

        <View style={styles.teamSection}>
          <Text style={styles.teamName}>{match.awayTeam.name}</Text>
          <Text style={styles.logo}>{match.awayTeam.logo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  liveBadge: {
    backgroundColor: '#ffe5e5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  matchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  logo: {
    fontSize: 28,
    marginVertical: 8,
  },
  scoreSection: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default MatchCard;
