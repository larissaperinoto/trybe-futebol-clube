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

/* const queryGeneral = `
  SELECT
  t.team_name as name,
    (
      (SUM(
        (t.id = m.away_team AND m.away_team_goals > m.home_team_goals)
        OR
        (t.id = m.home_team AND m.home_team_goals > m.away_team_goals)
      ) * 3 )
      +
      SUM(m.away_team_goals = m.home_team_goals)
     ) AS totalPoints,
      COUNT(t.id = m.away_team OR t.id = m.home_team) as totalGames,
      SUM(
        (t.id = m.away_team AND m.away_team_goals > m.home_team_goals)
        OR
        (t.id = m.home_team AND m.home_team_goals > m.away_team_goals)
      ) as totalVictories,
     SUM(m.away_team_goals = m.home_team_goals) as totalDraws,
     SUM(
       (t.id = m.away_team AND m.away_team_goals < m.home_team_goals)
        OR
        (t.id = m.home_team AND m.home_team_goals < m.away_team_goals)
     ) as totalLosses,
     SUM(
      (t.id = m.away_team AND m.away_team_goals)
         OR
      (t.id = m.home_team AND m.home_team_goals)
      ) as goalsFavor,
     SUM(
       (t.id = m.away_team AND m.home_team_goals)
         OR
      (t.id = m.home_team AND m.away_team_goals)
     ) as goalsOwn,
     ((SUM(
      (t.id = m.away_team AND m.away_team_goals)
         OR
      (t.id = m.home_team AND m.home_team_goals)
      )) -
      (SUM(
       (t.id = m.away_team AND m.home_team_goals)
         OR
      (t.id = m.home_team AND m.away_team_goals)
    ))
       ) as goalsBalance,
       FORMAT(((( (SUM(
        (t.id = m.away_team AND m.away_team_goals > m.home_team_goals)
        OR
        (t.id = m.home_team AND m.home_team_goals > m.away_team_goals)
      )  * 3) + SUM(m.away_team_goals = m.home_team_goals)) / (COUNT(t.id = m.away_team
        OR t.id = m.home_team) * 3)) * 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams as t
JOIN TRYBE_FUTEBOL_CLUBE.matches as m
WHERE m.in_progress = 0 AND (t.id = m.away_team OR t.id = m.home_team)
GROUP BY t.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`; */

export default query;
