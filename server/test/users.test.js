const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai

describe('Register', () => {
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
    
    it('Objeto contém chave "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('A chave "user" contem as propriedades "email", "role"', () => {
      expect(response.body.user).to.have.all.keys('email', 'role');
    });

    it('A chave "role" deve possuir o valor "user"', () => {
      expect(response.body.user.role).to.be.equal('user');
    });
  });
});

describe('Login', () => {
  describe('Quando o usuario não existe no banco de dados', () => {
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
        .post('/login')
        .send({
            'email': 'gabriel@gmail.com',
            'password': 'senha123'
        });
    });
    
    it('Retorna o código de status 401 e o objeto usuário', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal("Incorrect username or password");
    });

    it('Espera que a resposta seja "Unauthorized"', () => {
      expect(response.res.statusMessage).to.be.equal("Unauthorized");
    });

    describe('Quando o login é efetuado com sucesso', () => {
      before(async () => {

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
      });

      after(async () => {
        MongoClient.connect.restore();
        const mongo = await MongoMemoryServer.create();
        await mongo.stop();
      });

      it('Espera que a resposta seja "OK"', () => {
        expect(response.res.statusMessage).to.be.equal("OK");
      });
      
      it('Retorna o código de status 200 e o objeto usuário', () => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
      });
    });
  });
});
