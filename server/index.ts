import express = require('express');
import * as authenticationModule from './authentication/';
import * as paymentModule from './payment/';

const app = express();
const prefix = '/api';

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    next();
});
app.all('*', (req, res, next) => setTimeout(() => next(), 0));

app.use(prefix, authenticationModule);
app.use(prefix, paymentModule);

app.get('/', (req, res) => {
    res.send({
        title: 'Falcon (frontend)'
    });
});

app.listen(6969);
