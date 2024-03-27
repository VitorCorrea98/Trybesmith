import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { ProductInputtableTypes, ProductSequelizeModel} from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service'
import productController from '../../../src/controllers/product.controller'

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
    // Repare que, aqui, tipamos o valor de retorno do serviço para o tipo adequado.
    // Para isso, fomos lá em src/services/login.service.ts e exportamos o tipo Token para usarmos aqui!
    const serviceResponse: ServiceResponse<ProductSequelizeModel> = {
      status: 200,
      data: {message: 'Required'}
    }
    sinon.stub(productService, 'getAll').resolves(serviceResponse);
  
    // Act
    await productController.getAll(req, res);
    
    // Assert
    expect(res.status).to.have.been.calledWith(200);
  });

  it('ao não receber um e-mail, com username invalido', async function () {
    req.body = {name: "VITOA"} as ProductInputtableTypes
    // Repare que, aqui, tipamos o valor de retorno do serviço para o tipo adequado.
    // Para isso, fomos lá em src/services/login.service.ts e exportamos o tipo Token para usarmos aqui!
    const serviceResponse: ServiceResponse<ProductSequelizeModel> = {
      status: 200,
      data: {message: 'Required'}
    }
    sinon.stub(productService, 'insert').resolves(serviceResponse);
  
    // Act
    await productController.insert(req, res);
    
    // Assert
    expect(res.status).to.have.been.calledWith(400);
  });
});
