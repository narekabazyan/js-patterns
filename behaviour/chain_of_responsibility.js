class Handler {
    constructor() {
        this.next = {
            handleRequest: function () {
            }
        };
    }

    setNext(next) {
        this.next = next;
    };

    handleRequest() { };
}


class ErrorBadRequest extends Handler {
    handleRequest(request) {
        if(request.status === 400) {
            return {
                error_code: 400,
                error_message: request.message
            }
        }

        return this.next.handleRequest(request);
    }
}

class ErrorNotFound extends Handler {
    handleRequest(request) {
        if(request.status === 404) {
            if(request.status === 404) {
                return {
                    error_code: 404,
                    error_message: request.message
                }
            }
        }

        return this.next.handleRequest(request);
    }
}

class ErrorInternal extends Handler {
    handleRequest(request) {

        if(request.status === 500) {
            return {
                error_code: 500,
                error_message: request.message
            }
        }

        return this.next.handleRequest(request);
    }
}

class ValidateService {
    constructor(errors) {
        this._errors = errors;

        for (let i = 0; i< this._errors.length - 1; ++i) {
            let current_index = i;
            this._errors[current_index].setNext(this._errors[++current_index])
        }
    }

    validate(request) {
        return this._errors[0].handleRequest(request);
    }
}

const bad_request = new ErrorBadRequest();
const not_found = new ErrorNotFound();
const internal_error = new ErrorInternal();

const errors = [bad_request, not_found, internal_error];

const validation_service = new ValidateService(errors);

let data = {
    status: 500,
    message: "bad request"
};

const check_result = validation_service.validate(data);

console.log("Check Result ", check_result);
