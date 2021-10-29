const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Teste de integração', () => {
  describe('Quando usuário é criado com sucesso', () => {
    let response = {};

    before(async () => {
      const mongo = await MongoMemoryServer.create();
      const uri = mongo.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      const connectionMock = await MongoClient.connect(uri, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/register')
        .send({
            'email': 'gabriel@gmail.com',
            'password': 'senha123'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      const mongo = await MongoMemoryServer.create();
      await mongo.stop();
    });
    it ('Retorna um objeto', () => {
      expect(response.body.user).to.be.an('object')
    })
    it ('Retorna os campos "email"', () => {
      expect(response.body.user).to.have.property('email');
    })
    it('Retorna o código de status 201 e o objeto usuário', () => {
      expect(response).to.have.status(201);
    });
  });
});