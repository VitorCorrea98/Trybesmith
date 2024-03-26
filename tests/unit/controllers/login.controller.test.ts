import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { LoginFields } from '../../../src/types/Login';
import loginController from '../../../src/controllers/login.controller'

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('ao não receber um e-mail, retorne um erro', async function () {
    // Arrange
    req.body = loginMock.mockUser as LoginFields
    // Repare que, aqui, tipamos o valor de retorno do serviço para o tipo adequado.
    // Para isso, fomos lá em src/services/login.service.ts e exportamos o tipo Token para usarmos aqui!
    const serviceResponse: ServiceResponse<LoginFields> = {
      status: 200,
      data: loginMock.mockUser,
    }
    sinon.stub(loginService, 'Login').resolves(serviceResponse);
  
    // Act
    await loginController.createToken(req, res);
    
    // Assert
    expect(res.status).to.have.been.calledWith(200);
  });

  it('ao não receber um e-mail, com username invalido', async function () {
    // Arrange
    req.body = {username: 'BLABLABLA'} as LoginFields
    // Repare que, aqui, tipamos o valor de retorno do serviço para o tipo adequado.
    // Para isso, fomos lá em src/services/login.service.ts e exportamos o tipo Token para usarmos aqui!
    const serviceResponse: ServiceResponse<LoginFields> = {
      status: 400,
      data: {message: 'Required'}
    }
    sinon.stub(loginService, 'Login').resolves(serviceResponse);
  
    // Act
    await loginController.createToken(req, res);
    
    // Assert
    expect(res.status).to.have.been.calledWith(400);
  });
});
