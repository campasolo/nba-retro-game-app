export const getPlayerScoreKey = (sideKey, playerId) => `${sideKey}:${playerId}`;

export const createInitialPlayerScores = (homeTeam, awayTeam) => {
  const initialScores = {};

  [
    { sideKey: 'home', team: homeTeam },
    { sideKey: 'away', team: awayTeam },
  ].forEach(({ sideKey, team }) => {
    team.players.forEach((player) => {
      initialScores[getPlayerScoreKey(sideKey, player.id)] = 0;
    });
  });

  return initialScores;
};

export const addPointsToPlayer = (prevScores, playerScoreKey, points) => ({
  ...prevScores,
  [playerScoreKey]: (prevScores[playerScoreKey] || 0) + points,
});

export const getTeamTotalScore = (team, sideKey, scores) =>
  team.players.reduce(
    (sum, player) => sum + (scores[getPlayerScoreKey(sideKey, player.id)] || 0),
    0
  );
