export const nbaTeams = [
  {
    id: 'bos',
    name: 'Boston Celtics',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
    players: [
      { id: 'tatum', name: 'Jayson Tatum' },
      { id: 'brown', name: 'Jaylen Brown' },
      { id: 'holiday', name: 'Jrue Holiday' },
      { id: 'porzingis', name: 'Kristaps Porzingis' },
      { id: 'white', name: 'Derrick White' },
    ],
  },
  {
    id: 'lal',
    name: 'Los Angeles Lakers',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
    players: [
      { id: 'james', name: 'LeBron James' },
      { id: 'davis', name: 'Anthony Davis' },
      { id: 'reaves', name: 'Austin Reaves' },
      { id: 'hachimura', name: 'Rui Hachimura' },
      { id: 'russell', name: "D'Angelo Russell" },
    ],
  },
  {
    id: 'gsw',
    name: 'Golden State Warriors',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
    players: [
      { id: 'curry', name: 'Stephen Curry' },
      { id: 'thompson', name: 'Klay Thompson' },
      { id: 'green', name: 'Draymond Green' },
      { id: 'wiggins', name: 'Andrew Wiggins' },
      { id: 'kuminga', name: 'Jonathan Kuminga' },
    ],
  },
  {
    id: 'den',
    name: 'Denver Nuggets',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/den.png',
    players: [
      { id: 'jokic', name: 'Nikola Jokic' },
      { id: 'murray', name: 'Jamal Murray' },
      { id: 'gordon', name: 'Aaron Gordon' },
      { id: 'porterjr', name: 'Michael Porter Jr.' },
      { id: 'kcp', name: 'Kentavious Caldwell-Pope' },
    ],
  },
  {
    id: 'mia',
    name: 'Miami Heat',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
    players: [
      { id: 'butler', name: 'Jimmy Butler' },
      { id: 'adebayo', name: 'Bam Adebayo' },
      { id: 'herro', name: 'Tyler Herro' },
      { id: 'robinson', name: 'Duncan Robinson' },
      { id: 'jaquez', name: 'Jaime Jaquez Jr.' },
    ],
  },
  {
    id: 'mil',
    name: 'Milwaukee Bucks',
    logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mil.png',
    players: [
      { id: 'giannis', name: 'Giannis Antetokounmpo' },
      { id: 'lillard', name: 'Damian Lillard' },
      { id: 'middleton', name: 'Khris Middleton' },
      { id: 'lopez', name: 'Brook Lopez' },
      { id: 'beasley', name: 'Malik Beasley' },
    ],
  },
];

export const getTeamById = (teamId) =>
  nbaTeams.find((team) => team.id === teamId) || nbaTeams[0];

export const getNextTeamId = (currentTeamId) => {
  const currentIndex = nbaTeams.findIndex((team) => team.id === currentTeamId);

  if (currentIndex < 0) {
    return nbaTeams[0].id;
  }

  const nextIndex = (currentIndex + 1) % nbaTeams.length;
  return nbaTeams[nextIndex].id;
};
