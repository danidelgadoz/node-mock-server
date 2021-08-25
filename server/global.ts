export class HttpResponse {
    public success(response?: any) {
      return response;
    }

    public error(_error?: HttpErrorBody) {
      return _error;
    }
}

export class HttpErrorBody {
    code: string;
    message: string;
    title: string;

    constructor() {
        this.code = '';
        this.message = '';
        this.title = '';
    }
}

const tokenToForceUnauthorized = '66666666-6666-6666-6666-666666666666';

export class Authorization {
    get tokenToForceUnauthorized() {
        return tokenToForceUnauthorized;
    }

    public validateSession(req, res, next): void {
        if (!req.headers['authorization'] || req.headers['authorization'] === `Bearer ${tokenToForceUnauthorized}`) {
            res.status(401).json();
        } else {
            next();
        }
    }
}

