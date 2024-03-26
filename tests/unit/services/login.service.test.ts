import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service'
import { LoginFields } from '../../../src/types/Login';
import { response } from 'express';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testa o ENPOINT POST /login, para ver se o usuario consegue se cadastrar com sucesso', async () => {
    const mockFindReturn = UserModel.build(loginMock.mockUser);

    sinon.stub(UserModel, 'findOne').resolves(mockFindReturn);

    const loginFields: LoginFields = {
      password: 'Fluzao',
      username: 'Vitao'
    }

    const response = await loginService.Login(loginFields)
    expect(response.status).to.be.equal(200);
    expect(response.data).to.haveOwnProperty('username')
  })

  it('Testa o ENPOINT POST /login, com o password errado', async () => {
    const mockFindReturn = UserModel.build(loginMock.mockUser);

    sinon.stub(UserModel, 'findOne').resolves(mockFindReturn);

    const loginFields: LoginFields = {
      password: 'Fluza',
      username: 'Vitao'
    }

    const response = await loginService.Login(loginFields)
    expect(response.status).to.be.equal(401);
    expect(response.data).to.haveOwnProperty('message')
  })

  it('Testa o ENPOINT POST /login, sem o password', async () => {
    const mockFindReturn = UserModel.build(loginMock.mockUser);

    sinon.stub(UserModel, 'findOne').resolves(mockFindReturn);

    const loginFields = {
      username: 'Vitao'
    }

    const response = await loginService.Login(loginFields as LoginFields)
    expect(response.status).to.be.equal(400);
    expect(response.data).to.haveOwnProperty('message')
  })
});
