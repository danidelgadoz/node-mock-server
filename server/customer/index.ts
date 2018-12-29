import { Router } from 'express';
import { HttpErrorBody, HttpResponse } from '../global';

const router = Router();
const httpResponse = new HttpResponse();

const customers = [
    {
      'id': 1,
      'name': 'AGRO INDUSTRIAL PARAMONGA S.A.A.',
      'phoneNumber': '51-1- 2021111',
      'email': 'jmerino@agroparamonga.com',
      'documentType': 'RUC',
      'documentNumber': '20135948641',
      'address': 'Av. Ferrocarril 212, Zona Industrial.  Paramonga - Barranca.',
      'active': true,
      'deleted_at': false
    },
    {
      'id': 2,
      'name': 'CARTOPAC',
      'phoneNumber': '924415948',
      'email': 'despindola@cartonesdelpacifico.com.pe',
      'documentType': 'RUC',
      'documentNumber': '20518791983',
      'address': 'AV. REPUBLICA DE ARGENTINA NRO. 2842 URB. INDUSTRIAL WIESE LIMA - LIMA',
      'active': true,
      'deleted_at': false
    },
    {
      'id': 3,
      'name': 'Internovan B2B',
      'phoneNumber': '25454445',
      'email': 'b2b@internovam.com',
      'documentType': 'RUC',
      'documentNumber': '12544878787',
      'address': 'Av. Tejada 654',
      'active': true,
      'deleted_at': false
    },
    {
      'id': 4,
      'name': 'MILPO',
      'phoneNumber': '123456789',
      'email': 'informes@milpo.com',
      'documentType': 'RUC',
      'documentNumber': '12345678922',
      'address': 'AV MILPO',
      'active': true,
      'deleted_at': false
    },
    {
      'id': 5,
      'name': 'Internovam Tradicional',
      'phoneNumber': '545478454',
      'email': 'tradicional@internovam.com',
      'documentType': 'RUC',
      'documentNumber': '45455668812',
      'address': 'Av. Tejada 154545',
      'active': true,
      'deleted_at': false
    }
]; 

router.get('/customer/', (req, res) => {
    const response = customers;

    res.json(httpResponse.success(response));
});

router.get('/customer/:id', (req, res) => {
    const customer = customers.find( customer => customer.id == req.params.id );

    if (customer) {
        res.json(httpResponse.success(customer));
    } else {
        res.status(404).json(httpResponse.error(null));
    }    
});

router.post('/customer', (req, res) => {
    const INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER';
    const INVALID_EMAIL = 'INVALID_EMAIL';

    const happyPath = {
        'id': 1,
        'name': 'AGRO INDUSTRIAL PARAMONGA S.A.A.',
        'phoneNumber': '51-1- 2021111',
        'email': 'jmerino@agroparamonga.com',
        'documentType': 'RUC',
        'documentNumber': '20135948641',
        'address': 'Av. Ferrocarril 212, Zona Industrial.  Paramonga - Barranca.',
        'active': true,
        'deleted_at': false
    };

    let unhappyPath = [];
    unhappyPath.push(new HttpErrorBody());

    switch (req.body.documentNumber) {
        case '1':
            unhappyPath[0].code = INVALID_PHONE_NUMBER;
            res.status(409).json(httpResponse.error(unhappyPath));
            break;
        case '2':
            unhappyPath[0].code = INVALID_EMAIL;
            res.status(409).json(httpResponse.error(unhappyPath));
            break;
        default:
            res.status(200).json(httpResponse.success(happyPath));
    }
});

module.exports = router;

