import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model'
import { GetResponseCorrect, PostCallerCorrect, PostResponseCorrect } from '../../mocks/product.mock';
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

  it("Teste o ENDPOINT GET /products, para visualizar todos os produtos", async () => {
    const mockCreateReturn = ProductModel.bulkBuild(GetResponseCorrect);
    sinon.stub(ProductModel, 'findAll').resolves(mockCreateReturn);

    console.log({mockCreateReturn})
    const ServiceResponse = await produtcService.getAll();

    expect(ServiceResponse.status).to.be.equal(200);
  })
});
