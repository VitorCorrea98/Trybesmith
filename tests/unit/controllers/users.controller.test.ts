import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { User } from '../../../src/types/User';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { UserSequelizeModel } from '../../../src/database/models/user.model';
import userService from '../../../src/services/user.service'
import userController from '../../../src/controllers/user.controller'

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao não receber um e-mail, com username invalido', async function () {
    // Arrange
    req.body = {
      level: 19, 
      password: 'FAFAFA', 
      username: "vITAO",
      vocation: "Guerreiro"
    } as User
    // Repare que, aqui, tipamos o valor de retorno do serviço para o tipo adequado.
    // Para isso, fomos lá em src/services/login.service.ts e exportamos o tipo Token para usarmos aqui!
    const serviceResponse: ServiceResponse<UserSequelizeModel> = {
      status: 400,
      data: {message: 'Required'}
    }
    sinon.stub(userService, 'getAll').resolves(serviceResponse);
  
    // Act
    await userController.getAll(req, res);
    
    // Assert
    expect(res.status).to.have.been.calledWith(400);
  });
});
