const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração', function () {
  describe('Quando usuário é criado com sucesso', function () {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async function () {
      const URLMock = await DBServer.getUri();
      const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const connectionMock = await MongoClient.connect(URLMock, OPTIONS);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
            name: 'Gabriel',
            email: 'gabriel@gmail.com',
            password: 'senha123',
        });
    });

    after(async function () {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Retorna o código de status 201 e o objeto usuário', function () {
      expect(response).to.have.status(201);
    });
  });
});
