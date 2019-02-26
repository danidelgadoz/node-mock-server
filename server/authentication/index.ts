import { Router } from 'express';
import { Authorization } from '../global';

const router = Router();
const auth = new Authorization();

router.post('/oauth/token', (req, res) => {
    res.set('x-ratelimit-limit', '60');
    res.set('x-ratelimit-remaining', '59');

    let validCredentialsResponse = require('./data/valid-credentials');
    let badCredentialsResponse = require('./data/bad-credentials');
    
    if (req.body.grant_type === 'refresh_token') {
        res.status(200).json(validCredentialsResponse);

    } else {
        switch (req.body.username) {
            case 'invalid@gmail.com':
                res.status(401).json(badCredentialsResponse);
                break;
            case 'refesh@gmail.com':
                const response = Object.assign({}, validCredentialsResponse)
                response['access_token'] = auth.tokenToForceUnauthorized;
                res.status(200).json(response);
                break;
            default:
            setTimeout(() => {
                res.status(200).json(validCredentialsResponse);
            }, 0)
        }
    }
});

module.exports = router;

