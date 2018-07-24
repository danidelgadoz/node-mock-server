import { Router } from 'express';
import { HttpResponse } from '../global';

const router = Router();
const httpResponse = new HttpResponse();

router.post('/core/cashless/payment/get/pending', (req, res) => {
    const response = {
        "pendingPayments": [
            {
                "id": 1,
                "provider": {
                    "id": 1,
                    "idc": "11111",
                    "providerName": "ALICORP",
                    "documentType": 10,
                    "documentNumber": "44556677"
                },
                "statusId": 1,
                "statusName": "Pending",
                "documentNumber": 156643,
                "amount": 500
            }
            ]
        }
        res.status(200)
            .json(httpResponse.success(response));
});

module.exports = router;

