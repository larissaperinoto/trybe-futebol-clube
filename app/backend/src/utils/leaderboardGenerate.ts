import ILeaderboard from '../interfaces/ILeaderboard';

const leaderboardModel = () => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const infosByTeam = (home: ILeaderboard, away: ILeaderboard) => {
  const team = leaderboardModel();
  team.name = home.name;
  team.totalPoints = Number(home.totalPoints) + Number(away.totalPoints);
  team.totalGames = Number(home.totalGames) + Number(away.totalGames);
  team.totalVictories = Number(home.totalVictories) + Number(away.totalVictories);
  team.totalDraws = Number(home.totalDraws) + Number(away.totalDraws);
  team.totalLosses = Number(home.totalLosses) + Number(away.totalLosses);
  team.goalsFavor = Number(home.goalsFavor) + Number(away.goalsFavor);
  team.goalsOwn = Number(home.goalsOwn) + Number(away.goalsOwn);
  return team;
};

const orderTeams = (array: ILeaderboard[]) => {
  array.sort((a, b) => (b.totalPoints - a.totalPoints) || (b.totalVictories - a.totalVictories)
  || (b.goalsBalance - a.goalsBalance) || (b.goalsFavor - a.goalsFavor)
  || (b.goalsOwn - a.goalsOwn));
};

const leaderboardGenerate = (home: ILeaderboard[], away: ILeaderboard[]) => {
  const array: ILeaderboard[] = [];
  for (let i = 0; i < home.length; i += 1) {
    for (let j = 0; j < away.length; j += 1) {
      if (home[i].name === away[j].name) {
        const team = infosByTeam(home[i], away[j]);
        team.goalsBalance = team.goalsFavor - team.goalsOwn;
        team.efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
        team.efficiency = +(team.efficiency.toFixed(2));
        array.push(team as unknown as ILeaderboard);
      }
    }
  }
  orderTeams(array);
  return array;
};

export default leaderboardGenerate;
