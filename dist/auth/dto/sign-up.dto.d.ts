import { UserType } from '../../database/models/user.model';
export declare class SignUpDto {
    email: string;
    password: string;
    userType: UserType;
}
