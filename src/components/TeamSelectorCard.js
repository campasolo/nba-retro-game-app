import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

function TeamSelectorCard({ label, team, onChangeTeam }) {
  return (
    <View style={styles.card}>
      <Text style={styles.sideLabel}>{label}</Text>

      <View style={styles.headerRow}>
        <Image source={{ uri: team.logoUrl }} style={styles.logo} resizeMode="contain" />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Pressable style={styles.switchButton} onPress={onChangeTeam}>
            <Text style={styles.switchButtonText}>Change Team</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.playersTitle}>Starting Players</Text>
      <FlatList
        data={team.players}
        keyExtractor={(player) => player.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <Text style={styles.playerName}>{`${index + 1}. ${item.name}`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#f4d35e',
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#1b263b',
    gap: 8,
  },
  sideLabel: {
    color: '#f4d35e',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 72,
    height: 72,
    backgroundColor: '#0d1b2a',
    borderRadius: 10,
  },
  teamInfo: {
    flex: 1,
    gap: 8,
  },
  teamName: {
    color: '#e0e1dd',
    fontSize: 18,
    fontWeight: '800',
  },
  switchButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ee964b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  switchButtonText: {
    color: '#0d1b2a',
    fontWeight: '700',
  },
  playersTitle: {
    color: '#98c1d9',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  playerName: {
    color: '#f1f5f9',
    fontSize: 14,
    paddingVertical: 3,
  },
});

export default TeamSelectorCard;
