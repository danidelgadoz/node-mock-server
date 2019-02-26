import * as express from 'express';
import * as morgan from 'morgan';
import * as authenticationModule from './authentication/';
import * as customer from './customer/';

const app = express();
const prefix = '/api';

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Length, Content-Type, Authorization, MyCustomHeaderKey');
    next();
});
app.all('*', (req, res, next) => setTimeout(() => next(), 500));

app.use('', authenticationModule);
app.use(prefix, customer);

app.get('/', (req, res) => {
    res.send({
        title: 'Falcon (frontend)'
    });
});

app.listen(3000);
