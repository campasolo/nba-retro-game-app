import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeamSelectorCard from '../components/TeamSelectorCard';
import { getNextTeamId, getTeamById, nbaTeams } from '../data/nbaTeams';

function MatchSetupScreen({ navigation }) {
  const [homeTeamId, setHomeTeamId] = useState(nbaTeams[0].id);
  const [awayTeamId, setAwayTeamId] = useState(nbaTeams[1].id);

  const homeTeam = useMemo(() => getTeamById(homeTeamId), [homeTeamId]);
  const awayTeam = useMemo(() => getTeamById(awayTeamId), [awayTeamId]);

  const cycleHomeTeam = () => setHomeTeamId((currentId) => getNextTeamId(currentId));
  const cycleAwayTeam = () => setAwayTeamId((currentId) => getNextTeamId(currentId));

  const startMatch = () => {
    navigation.navigate('GameScore', {
      homeTeamId,
      awayTeamId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}
      >
        <View style={styles.mainBlock}>
          <Text style={styles.title}>Configure Your Retro Match</Text>

          <TeamSelectorCard label="Home Team" team={homeTeam} onChangeTeam={cycleHomeTeam} />

          <TeamSelectorCard
            label="Away Team"
            team={awayTeam}
            onChangeTeam={cycleAwayTeam}
          />

          <Pressable style={styles.startButton} onPress={startMatch}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1b2a',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainBlock: {
    gap: 16,
  },
  title: {
    color: '#f4d35e',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 2,
  },
  startButton: {
    backgroundColor: '#7bd389',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  startButtonText: {
    color: '#0d1b2a',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

export default MatchSetupScreen;
