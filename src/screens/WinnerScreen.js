import { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTeamById } from '../data/nbaTeams';
import { getPlayerScoreKey } from '../domain/scoreboard';

const getTopScorers = (team, sideKey, scores) =>
  team.players
    .map((player) => ({
      ...player,
      points: scores[getPlayerScoreKey(sideKey, player.id)] || 0,
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

function TopScorersCard({ team, sideKey, scores }) {
  const topScorers = useMemo(
    () => getTopScorers(team, sideKey, scores),
    [team, sideKey, scores]
  );

  return (
    <View style={styles.scorersCard}>
      <Text style={styles.scorersTitle}>{`Top 5 - ${team.name}`}</Text>
      {topScorers.map((player, index) => (
        <View key={player.id} style={styles.playerRow}>
          <Text style={styles.playerName}>{`${index + 1}. ${player.name}`}</Text>
          <Text style={styles.playerPoints}>{`${player.points} pts`}</Text>
        </View>
      ))}
    </View>
  );
}

function WinnerScreen({ route, navigation }) {
  const {
    homeTeamId,
    awayTeamId,
    homePoints = 0,
    awayPoints = 0,
    playerScores = {},
  } = route.params || {};

  const homeTeam = useMemo(() => getTeamById(homeTeamId), [homeTeamId]);
  const awayTeam = useMemo(() => getTeamById(awayTeamId), [awayTeamId]);

  const isDraw = homePoints === awayPoints;
  const winnerTeam = homePoints > awayPoints ? homeTeam : awayTeam;

  const playAgain = () => {
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isDraw ? 'Empate' : 'Ganador'}</Text>

        {isDraw ? (
          <View style={styles.drawContent}>
            <Text style={styles.drawMessage}>El partido termina en empate</Text>
            <View style={styles.logosRow}>
              <Image source={{ uri: homeTeam.logoUrl }} style={styles.logo} resizeMode="contain" />
              <Image source={{ uri: awayTeam.logoUrl }} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.scoreText}>{`${homePoints} - ${awayPoints}`}</Text>
            <Text style={styles.teamsText}>{`${homeTeam.name} vs ${awayTeam.name}`}</Text>
          </View>
        ) : (
          <View style={styles.winnerContent}>
            <Image source={{ uri: winnerTeam.logoUrl }} style={styles.winnerLogo} resizeMode="contain" />
            <Text style={styles.winnerName}>{winnerTeam.name}</Text>
            <Text style={styles.winnerMessage}>se lleva la victoria</Text>
            <Text style={styles.scoreText}>{`${homePoints} - ${awayPoints}`}</Text>
          </View>
        )}

        {isDraw ? (
          <>
            <TopScorersCard team={homeTeam} sideKey="home" scores={playerScores} />
            <TopScorersCard team={awayTeam} sideKey="away" scores={playerScores} />
          </>
        ) : (
          <TopScorersCard
            team={winnerTeam}
            sideKey={winnerTeam.id === homeTeam.id ? 'home' : 'away'}
            scores={playerScores}
          />
        )}

        <Pressable style={styles.button} onPress={playAgain}>
          <Text style={styles.buttonText}>Nueva partida</Text>
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
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  title: {
    color: '#f4d35e',
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  winnerContent: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#f4d35e',
    borderRadius: 18,
    backgroundColor: '#1b263b',
    paddingVertical: 24,
    paddingHorizontal: 14,
    alignItems: 'center',
    gap: 8,
  },
  drawContent: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#f4d35e',
    borderRadius: 18,
    backgroundColor: '#1b263b',
    paddingVertical: 24,
    paddingHorizontal: 14,
    alignItems: 'center',
    gap: 8,
  },
  drawMessage: {
    color: '#e0e1dd',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  logosRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 6,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: '#0d1b2a',
    borderRadius: 12,
  },
  winnerLogo: {
    width: 170,
    height: 170,
    backgroundColor: '#0d1b2a',
    borderRadius: 14,
  },
  winnerName: {
    color: '#7bd389',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  winnerMessage: {
    color: '#e0e1dd',
    fontSize: 17,
    fontWeight: '700',
  },
  scoreText: {
    color: '#ee964b',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 4,
  },
  teamsText: {
    color: '#98c1d9',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  scorersCard: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ee964b',
    borderRadius: 14,
    backgroundColor: '#1b263b',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  scorersTitle: {
    color: '#f4d35e',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d1b2a',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  playerName: {
    color: '#e0e1dd',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    paddingRight: 8,
  },
  playerPoints: {
    color: '#7bd389',
    fontSize: 14,
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#7bd389',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0d1b2a',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default WinnerScreen;
