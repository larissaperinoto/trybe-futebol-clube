import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import teamsMock from './mocks/teams.mock';

import { Response } from 'superagent';
import Team from '../database/models/team.model';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /teams', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa método GET na rota /teams', () => {
    it('Usuário consegue obter todos os times', async () => {

      sinon.stub(Team, "findAll").resolves(teamsMock as unknown as Team[]);

      const response = await chai
              .request(app)
              .get('/teams');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock);

    });

    it('Usuário consegue obter um time pelo Id', async () => {

      sinon.stub(Team, "findByPk").resolves(teamsMock[0] as unknown as Team);

      const response = await chai
              .request(app)
              .get('/teams/1');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock[0]);

    });
  });
});
