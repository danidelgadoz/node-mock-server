import * as express from 'express';
import * as morgan from 'morgan';
import * as authenticationModule from './authentication/';
import * as customer from './customer/';

const app = express();
const prefix = '/api';

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    next();
});
app.all('*', (req, res, next) => setTimeout(() => next(), 0));

app.use('', authenticationModule);
app.use(prefix, customer);

app.get('/', (req, res) => {
    res.send({
        title: 'Falcon (frontend)'
    });
});

app.listen(3000);
