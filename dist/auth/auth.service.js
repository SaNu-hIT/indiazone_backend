"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const users_service_1 = require("../users/users.service");
const user_model_1 = require("../database/models/user.model");
let AuthService = class AuthService {
    constructor(configService, usersService) {
        this.configService = configService;
        this.usersService = usersService;
        this.cognitoClient = new aws_sdk_1.CognitoIdentityServiceProvider({
            region: this.configService.get('AWS_REGION'),
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
        });
    }
    async validateUser(token) {
        try {
            const params = {
                AccessToken: token,
            };
            const result = await this.cognitoClient.getUser(params).promise();
            const email = result.UserAttributes.find(attr => attr.Name === 'email')?.Value;
            const cognitoUserId = result.Username;
            if (!email || !cognitoUserId) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            let user = await this.usersService.findByCognitoId(cognitoUserId);
            if (!user) {
                const createUserDto = {
                    type: user_model_1.UserType.CUSTOMER,
                    aws_cognito_id: cognitoUserId,
                    email,
                    first_name: result.UserAttributes.find(attr => attr.Name === 'given_name')?.Value,
                    last_name: result.UserAttributes.find(attr => attr.Name === 'family_name')?.Value,
                    phone: result.UserAttributes.find(attr => attr.Name === 'phone_number')?.Value,
                };
                user = await this.usersService.create(createUserDto);
            }
            return user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async signUp(email, password, userType) {
        const params = {
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            Username: email,
            Password: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'custom:user_type',
                    Value: userType,
                },
            ],
        };
        try {
            const result = await this.cognitoClient.signUp(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async signIn(email, password) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
            },
        };
        try {
            const result = await this.cognitoClient.initiateAuth(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async confirmSignUp(email, confirmationCode) {
        const params = {
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            Username: email,
            ConfirmationCode: confirmationCode,
        };
        try {
            const result = await this.cognitoClient.confirmSignUp(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async resendConfirmationCode(email) {
        const params = {
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            Username: email,
        };
        try {
            const result = await this.cognitoClient.resendConfirmationCode(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async forgotPassword(email) {
        const params = {
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            Username: email,
        };
        try {
            const result = await this.cognitoClient.forgotPassword(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async confirmForgotPassword(email, confirmationCode, newPassword) {
        const params = {
            ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
            Username: email,
            ConfirmationCode: confirmationCode,
            Password: newPassword,
        };
        try {
            const result = await this.cognitoClient.confirmForgotPassword(params).promise();
            return result;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map