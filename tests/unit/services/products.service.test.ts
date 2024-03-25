import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model'
import { PostCallerCorrect, PostResponseCorrect } from '../../mocks/product.mock';
import produtcService from '../../../src/services/product.service'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it("Teste o ENDPOINT POST /products, para cadastrar um produto novo", async () => {
    const mockCreateReturn = ProductModel.build(PostCallerCorrect);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const ServiceResponse = await produtcService.insert(PostCallerCorrect);

    expect(ServiceResponse.status).to.be.equal(201);
    expect(ServiceResponse.data).to.haveOwnProperty('id');

  })
});
