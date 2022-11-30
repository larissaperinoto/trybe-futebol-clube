const query = `
  SELECT
  t.team_name as name,
  (
    (SUM(m.:team1 > m.:team2) * 3) +
    SUM(m.:team1 = m.:team2)
  ) as totalPoints,
  COUNT(m.:reference) as totalGames,
  SUM(m.:team1 > m.:team2) as totalVictories,
  SUM(m.:team1 = m.:team2) as totalDraws,
  SUM(m.:team1 < m.:team2) as totalLosses,
  SUM(m.:team1) as goalsFavor,
  SUM(m.:team2) as goalsOwn,
  (SUM(m.:team1) - SUM(m.:team2)) as goalsBalance,
  FORMAT(
    (
      (
        (SUM(m.:team1 > m.:team2) * 3) +
        SUM(m.:team1 = m.:team2)
      ) / (COUNT(m.:reference) * 3)
    ) * 100, 2
  ) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON m.:reference = t.id
WHERE m.in_progress = 0
GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default query as string;
