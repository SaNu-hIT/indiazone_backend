"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let SequelizeExceptionFilter = class SequelizeExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.BAD_REQUEST;
        let message = 'Database error';
        let errors = {};
        if (exception instanceof sequelize_1.ValidationError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Validation error';
            errors = exception.errors.map(error => ({
                field: error.path,
                message: error.message,
                value: error.value,
            }));
        }
        else if (exception instanceof sequelize_1.UniqueConstraintError) {
            status = common_1.HttpStatus.CONFLICT;
            message = 'Unique constraint violation';
            errors = {
                fields: exception.fields,
                message: exception.message,
            };
        }
        else if (exception instanceof sequelize_1.ForeignKeyConstraintError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Foreign key constraint violation';
            errors = {
                table: exception.table,
                fields: exception.fields,
                message: exception.message,
            };
        }
        else if (exception instanceof sequelize_1.DatabaseError) {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Database error';
            errors = {
                message: exception.message,
                sql: exception.sql,
            };
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
            errors,
        });
    }
};
exports.SequelizeExceptionFilter = SequelizeExceptionFilter;
exports.SequelizeExceptionFilter = SequelizeExceptionFilter = __decorate([
    (0, common_1.Catch)(sequelize_1.ValidationError, sequelize_1.UniqueConstraintError, sequelize_1.ForeignKeyConstraintError, sequelize_1.DatabaseError)
], SequelizeExceptionFilter);
//# sourceMappingURL=sequelize-exception.filter.js.map