class HttpResponse {
    success(response) {
        return response;
    }

    error(_error) {
        return _error;
    }
}

class HttpErrorBody {
    code;
    message;
    title;

    constructor() {
        this.code = '';
        this.message = '';
        this.title = '';
    }
}

const tokenToForceUnauthorized = '66666666-6666-6666-6666-666666666666';

class Authorization {
    get tokenToForceUnauthorized() {
        return tokenToForceUnauthorized;
    }

    validateSession(req, res, next) {
        if (!req.headers['authorization'] || req.headers['authorization'] === `Bearer ${tokenToForceUnauthorized}`) {
            res.status(401).json();
        } else {
            next();
        }
    }
}

module.exports = {
    HttpResponse,
    HttpErrorBody,
    Authorization,
    tokenToForceUnauthorized
};
