const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Tasks', () => {
  describe('Quando a task é registrada com sucesso', () => {
    let response = {};
    let tasks = [{}];
    let userDoesNotExist = {};

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

      response = await chai.request(server)
        .post('/login')
        .send({
            'email': 'gabriel@gmail.com',
            'password': 'senha123'
        });

      tasks = await chai.request(server)
        .post('/tasks')
        .send({
            'email': 'gabriel@gmail.com',
            'task': 'Fazer farinha com pão de sal'
        });

      userDoesNotExist = await chai.request(server)
        .post('/tasks')
        .send({
            'task': 'Fazer farinha com pão de sal'
        });
      
    });

    after(async () => {
      MongoClient.connect.restore();
      const mongo = await MongoMemoryServer.create();
      await mongo.stop();
    });

    it ('Retorna um objeto', (done) => {
      expect(tasks.body).to.be.an('object')
      done();
    })

    it ('A task retorna o email do usuario cadastrado', (done) => {
      expect(tasks.body.tasks.email).to.be.equal(response.body.email)
      done();
    })
    describe('Se usuário estiver deslogado', () => {

      it ('A mensagem recebida vai ser "User not loged in or does not exists!"', (done) => {
        expect(userDoesNotExist.body.message).to.be.equal("User not loged in or does not exists!");
        done();
      })

      it ('Vai retornar o erro 400', (done) => {
        expect(userDoesNotExist).to.have.status(400);
        done();
      })
    })
  });
});

