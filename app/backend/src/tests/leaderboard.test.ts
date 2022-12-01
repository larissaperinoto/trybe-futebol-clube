import * as sinon from 'sinon';
import * as chai from 'chai';
import { QueryTypes } from 'sequelize';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Model from '../database/models';
import leaderboardHomeMock from './mocks/leaderboardHome.mock';
import leaderboardAwayMock from './mocks/leaderboardAway.mock';
import { Response } from 'superagent';
import ILeaderboard from '../interfaces/ILeaderboard';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /leaderboard', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa método GET na rota /leaderboard/home', () => {
    it('É possível obter a classificação dos times que jogaram em casa', async () => {

      sinon.stub(Model, "query").withArgs(sinon.match.string, { type: QueryTypes.SELECT })
        .resolves(leaderboardHomeMock as ILeaderboard[] | any);

      const response = await chai
              .request(app)
              .get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderboardHomeMock);
    });
  });

  describe('Testa método GET na rota /leaderboard/away', () => {
    it('É possível obter a classificação dos times que jogaram fora de casa', async () => {

      sinon.stub(Model, "query").resolves(leaderboardAwayMock as ILeaderboard | any);

      const response = await chai
              .request(app)
              .get('/leaderboard/away');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderboardAwayMock);
    });
  });

  describe('Testa método GET na rota /leaderboard', () => {
    it('É possível obter a classificação geral dos times', async () => {

      sinon.stub(Model, "query").resolves(leaderboardHomeMock as [unknown[], unknown]);
      sinon.restore()
      sinon.stub(Model, "query").resolves(leaderboardAwayMock as [unknown[], unknown]);

      const response = await chai
              .request(app)
              .get('/leaderboard');

      expect(response.status).to.be.equal(200);
    });
  });
});
