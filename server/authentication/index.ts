import { Router } from 'express';
import { HttpErrorBody, HttpResponse } from '../global';

const router = Router();
const httpResponse = new HttpResponse();

const getKeys = (pos) => {
    const keys = [
        ['4', '6', '1', '5', '8', '0', '2', '3', '9', '7'],
        ['1', '5', '2', '8', '3', '0', '4', '6', '7', '9'],
        ['2', '3', '1', '4', '8', '9', '7', '5', '0', '6'],
        ['3', '1', '0', '8', '7', '2', '5', '9', '6', '4']
    ];
    return keys[pos];
};

router.get('/core/keyboard', (req, res) => {
    res.set('X-KEYBOARD', 'z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==');
    const response = getKeys(Math.floor((Math.random() * 4)));
    res.json(httpResponse.success(response));
});

router.post('/core/login', (req, res) => {
    const CARD_IS_BLOCKED = 'YC01';
    const CARD_IS_NOT_THE_SAME = 'YC07';
    const FAILED_AUTHENTICATION = 'YL02';
    const KEYBOARD_EXPIRED = 'YL03';
    const MAX_NUMBER_OF_ATTEMPS = 'YL01';
    const INVALID_DEVICE_UUID_LOGIN = 'YL04';

    const happyPath = { hasCard: true };
    let unhappyPath = [];
    unhappyPath.push(new HttpErrorBody());

    const pinPosition = (req.body.pinPosition).join().replace(/,/g , '');

    switch (pinPosition) {
        case '000000':
            unhappyPath[0].code = CARD_IS_BLOCKED;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        case '111111':
            unhappyPath[0].code = CARD_IS_NOT_THE_SAME;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        case '222222':
            unhappyPath[0].code = FAILED_AUTHENTICATION;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        case '333333':
            unhappyPath[0].code = KEYBOARD_EXPIRED;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        case '444444':
            unhappyPath[0].code = MAX_NUMBER_OF_ATTEMPS;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        case '555555':
            unhappyPath[0].code = INVALID_DEVICE_UUID_LOGIN;
            res.status(401).json(httpResponse.error(unhappyPath));
            break;
        default:
            res.status(200).json(httpResponse.success(happyPath));
    }
});

router.post('/core/device', (req, res) => {
    let unhappyPath = [];
    unhappyPath.push(new HttpErrorBody());

    if (req.body.phoneNumber === '999999996') {
        unhappyPath[0].code = 'PHONE_NUMBER_ALREADY_ASSIGN_TO_OTHER_CUSTOMER';
        unhappyPath[0].message = 'Phone number already bind to another customer';
        unhappyPath[0].title = 'Phone number already bind to another custome';
        res.status(409).json(httpResponse.error(unhappyPath));

    } else {
        res.status(200).json(httpResponse.success(null));
    }
});

router.post('/core/otp', (req, res) => {
    res.status(200).json(httpResponse.success(null));
});

module.exports = router;
