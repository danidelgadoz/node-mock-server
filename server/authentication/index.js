const express = require('express');
const { Authorization } = require('../global');

const router = express.Router();
const auth = new Authorization();

router.post('/oauth/token', (req, res) => {
    res.set('x-ratelimit-limit', '60');
    res.set('x-ratelimit-remaining', '59');

    let validCredentialsResponse = require('./data/valid-credentials');
    let badCredentialsResponse = require('./data/bad-credentials');

    if (req.body.grant_type === 'refresh_token') {
        res.status(200).json(validCredentialsResponse);

    } else {
        switch (req.body.email) {
            case 'invalid@example.com':
                setTimeout(() => {
                    res.status(401).json(badCredentialsResponse);
                }, 500)
                break;
            case 'refesh@example.com':
                const response = Object.assign({}, validCredentialsResponse)
                response['access_token'] = auth.tokenToForceUnauthorized;
                res.status(200).json(response);
                break;
            default:
                setTimeout(() => {
                    res.status(200).json(validCredentialsResponse);
                }, 3000)
        }
    }
});

module.exports = router;

