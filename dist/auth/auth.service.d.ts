import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserType } from '../database/models/user.model';
export declare class AuthService {
    private configService;
    private usersService;
    private cognitoClient;
    constructor(configService: ConfigService, usersService: UsersService);
    validateUser(token: string): Promise<any>;
    signUp(email: string, password: string, userType: UserType): Promise<any>;
    signIn(email: string, password: string): Promise<any>;
    confirmSignUp(email: string, confirmationCode: string): Promise<any>;
    resendConfirmationCode(email: string): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    confirmForgotPassword(email: string, confirmationCode: string, newPassword: string): Promise<any>;
}
