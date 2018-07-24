export class HttpResponse {
    public success(response: any) {
        return {
            response: response,
            errors: []
        };
    }

    public error(_errors: Array<any>, _response?: any) {
        return {
            response: _response || null,
            errors: _errors
        };
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

