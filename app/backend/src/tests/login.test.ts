import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/user.model';
import userMock from './mocks/user.mock';
import token from './mocks/token.mock';

import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testa o método POST na rota /login', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  it('Usuário consegue fazer login com sucesso', async () => {

    sinon.stub(User, "findOne").resolves(userMock as unknown as User);
    sinon.stub(jsonwebtoken, 'sign').resolves(token.token);

    const response = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'admin@admin.com',
              password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
            });


    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(token);

  });

  it('Usuário não está cadastrado', async () => {
    const response = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'admin@teste.com',
              password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.Pw'
            });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('Usuário não informa o campo "email"', async () => {
    const response = await chai
            .request(app)
            .post('/login')
            .send({
              password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.Pw'
            });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Usuário não informa o campo "password"', async () => {
    const response = await chai
            .request(app)
            .post('/login')
            .send({
              email: 'admin@admin.com',
            });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
});
