import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeamScorePanel from '../components/TeamScorePanel';
import { getTeamById } from '../data/nbaTeams';
import {
  addPointsToPlayer,
  createInitialPlayerScores,
  getTeamTotalScore,
} from '../domain/scoreboard';

function GameScoreScreen({ route, navigation }) {
  const { homeTeamId, awayTeamId } = route.params;

  const homeTeam = useMemo(() => getTeamById(homeTeamId), [homeTeamId]);
  const awayTeam = useMemo(() => getTeamById(awayTeamId), [awayTeamId]);

  const [playerScores, setPlayerScores] = useState(() =>
    createInitialPlayerScores(homeTeam, awayTeam)
  );

  const homeTotal = useMemo(
    () => getTeamTotalScore(homeTeam, 'home', playerScores),
    [homeTeam, playerScores]
  );
  const awayTotal = useMemo(
    () => getTeamTotalScore(awayTeam, 'away', playerScores),
    [awayTeam, playerScores]
  );

  const addPoints = (playerKey, points) => {
    setPlayerScores((prevScores) => addPointsToPlayer(prevScores, playerKey, points));
  };

  const finishGame = () => {
    navigation.navigate('Winner', {
      homeTeamId: homeTeam.id,
      awayTeamId: awayTeam.id,
      homePoints: homeTotal,
      awayPoints: awayTotal,
      playerScores,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.boardHeader}>
          <Text style={styles.boardTitle}>Game Scoreboard</Text>
          <Text style={styles.mainScore}>{`${homeTotal} - ${awayTotal}`}</Text>
        </View>

        <TeamScorePanel
          sideKey="home"
          title="Home"
          team={homeTeam}
          scores={playerScores}
          teamTotal={homeTotal}
          onAddPoints={addPoints}
        />

        <TeamScorePanel
          sideKey="away"
          title="Away"
          team={awayTeam}
          scores={playerScores}
          teamTotal={awayTotal}
          onAddPoints={addPoints}
        />

        <Pressable style={styles.finishButton} onPress={finishGame}>
          <Text style={styles.finishButtonText}>Fin del Juego</Text>
        </Pressable>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  boardHeader: {
    borderWidth: 2,
    borderColor: '#f4d35e',
    borderRadius: 16,
    backgroundColor: '#1b263b',
    paddingVertical: 14,
    alignItems: 'center',
  },
  boardTitle: {
    color: '#f4d35e',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  mainScore: {
    color: '#7bd389',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 5,
  },
  finishButton: {
    backgroundColor: '#f4d35e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  finishButtonText: {
    color: '#0d1b2a',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

export default GameScoreScreen;
