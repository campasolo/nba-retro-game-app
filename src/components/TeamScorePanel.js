import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getPlayerScoreKey } from '../domain/scoreboard';

function TeamScorePanel({ sideKey, title, team, scores, teamTotal, onAddPoints }) {
  return (
    <View style={styles.card}>
      <Text style={styles.panelLabel}>{title}</Text>

      <View style={styles.teamHeader}>
        <Image source={{ uri: team.logoUrl }} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamTotal}>{`Total: ${teamTotal}`}</Text>
        </View>
      </View>

      <FlatList
        data={team.players}
        keyExtractor={(player) => player.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const playerScoreKey = getPlayerScoreKey(sideKey, item.id);
          const currentScore = scores[playerScoreKey] || 0;

          return (
            <View style={styles.playerRow}>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerPoints}>{`${currentScore} pts`}</Text>
              </View>

              <View style={styles.buttonsRow}>
                <Pressable
                  style={styles.pointsButton}
                  onPress={() => onAddPoints(playerScoreKey, 2)}
                >
                  <Text style={styles.pointsButtonText}>+2</Text>
                </Pressable>
                <Pressable
                  style={styles.pointsButton}
                  onPress={() => onAddPoints(playerScoreKey, 3)}
                >
                  <Text style={styles.pointsButtonText}>+3</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#f4d35e',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#1b263b',
    gap: 10,
  },
  panelLabel: {
    color: '#f4d35e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#0d1b2a',
    borderRadius: 8,
  },
  teamName: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '800',
  },
  teamTotal: {
    color: '#ee964b',
    marginTop: 2,
    fontWeight: '700',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0d1b2a',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 7,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#e0e1dd',
    fontSize: 14,
    fontWeight: '600',
  },
  playerPoints: {
    color: '#98c1d9',
    fontSize: 12,
    marginTop: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pointsButton: {
    minWidth: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#ee964b',
  },
  pointsButtonText: {
    color: '#0d1b2a',
    fontWeight: '800',
  },
});

export default TeamScorePanel;
