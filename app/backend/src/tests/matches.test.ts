import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import matchesMock from './mocks/matches.mock';

import { Response } from 'superagent';
import Match from '../database/models/matches.model';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa a rota /teams', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa método GET na rota /matches', () => {
    it('Usuário consegue obter todos os dados', async () => {

      sinon.stub(Match, "findAll").resolves(matchesMock as unknown as Match[]);

      const response = await chai
              .request(app)
              .get('/matches');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesMock);
    });
  });
});
