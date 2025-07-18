"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        return next.handle().pipe((0, operators_1.map)(data => ({
            statusCode: response.statusCode,
            message: this.getSuccessMessage(context),
            data,
            timestamp: new Date().toISOString(),
        })));
    }
    getSuccessMessage(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const method = request.method;
        switch (method) {
            case 'POST':
                return 'Resource created successfully';
            case 'PUT':
            case 'PATCH':
                return 'Resource updated successfully';
            case 'DELETE':
                return 'Resource deleted successfully';
            default:
                return 'Request processed successfully';
        }
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map