const express = require('express');
const logger = require('morgan');

const app = express();
const prefix = '/api';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Length, Content-Type, Authorization, MyCustomHeaderKey, mycustomheaderkey2, myproductheaderkey, myproductheaderkey2');
    next();
});
app.all('*', (req, res, next) => setTimeout(() => next(), 500));

app.use('', require('./authentication'));
app.use(prefix, require('./products'));

app.get('/', (req, res) => {
    res.send({
        title: 'Node mock server with typescript'
    });
});

app.listen(3000);
