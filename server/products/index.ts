import { Router } from 'express';
import { HttpErrorBody, HttpResponse, Authorization } from '../global';
import { v4 as uuid } from 'uuid';

const router = Router();
const httpResponse = new HttpResponse();
const auth = new Authorization();

let PRODUCTS: any[] = require("./data");
// auth.validateSession
router.get('/products/', (req, res) => {
  res.json(httpResponse.success(PRODUCTS));
});

router.get('/products/:id', (req, res) => {
  const model = PRODUCTS.find(p => p.id == req.params.id);

  if (model) {
    res.json(httpResponse.success(model));
  } else {
    res.status(404).json(httpResponse.error(null));
  }
});

router.post('/products', (req, res) => {
  const newModel = {
    id: uuid(),
    ...req.body
  };

  let unhappyPath = new HttpErrorBody();

  switch (req.body.productCode) {
    case '1111111':
      unhappyPath.code = 'ERROR_NAME_ALREADY_EXISTS';
      unhappyPath.message = 'Product name already exists';
      res.status(409).json(httpResponse.error(unhappyPath));
      break;
    case '2222222':
      unhappyPath.code = 'ERROR_CODE_ALREADY_EXISTS';
      unhappyPath.message = 'Product code already exists';
      res.status(409).json(httpResponse.error(unhappyPath));
      break;
    default:
      PRODUCTS = [...PRODUCTS, newModel]
      res.status(200).json(httpResponse.success(newModel));
  }
});

router.put('/products/:id', (req, res) => {
  const index = PRODUCTS.findIndex(p => p.id == req.params.id);
  PRODUCTS[index] = { ...PRODUCTS[index], ...req.body }

  res.status(200).json(httpResponse.success(PRODUCTS[index]));
});

router.delete('/products/:id', (req, res) => {
  const model = PRODUCTS.find(p => p.id == req.params.id);

  if (model) {
    PRODUCTS = PRODUCTS.filter(p => p.id != req.params.id);
    res.json(httpResponse.success());
  } else {
    res.status(404).json(httpResponse.error());
  }
});

module.exports = router;

