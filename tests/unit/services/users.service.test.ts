import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import { AllUsers } from '../../mocks/user.mock';
import userService from '../../../src/services/user.service'

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it("Testa o ENDPOINT GET /users, para visualizar todos os usuários", async () => {
    const mockGetAllReturn = UserModel.bulkBuild(AllUsers);
    sinon.stub(UserModel, 'findAll').resolves(mockGetAllReturn);

    const ServiceResponse = await userService.getAll();

    expect(ServiceResponse.status).to.be.equal(200);
  })
});
