import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ConfirmSignUpDto } from './dto/confirm-sign-up.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<any>;
    signIn(signInDto: SignInDto): Promise<any>;
    confirmSignUp(confirmSignUpDto: ConfirmSignUpDto): Promise<any>;
    resendConfirmation(forgotPasswordDto: ForgotPasswordDto): Promise<any>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any>;
    confirmForgotPassword(confirmForgotPasswordDto: ConfirmForgotPasswordDto): Promise<any>;
}
