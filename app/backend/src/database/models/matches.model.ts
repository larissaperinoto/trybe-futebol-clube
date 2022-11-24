import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './teams.model';

class Match extends Model {
  declare id: number;
  declare homeName: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoal: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamHasMany' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamHasMany' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeMatchBelongsTo' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayMatchBelongsTo' });

export default Match;
