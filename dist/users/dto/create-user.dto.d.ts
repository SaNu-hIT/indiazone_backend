import { UserType } from '../../database/models/user.model';
export declare class CreateUserDto {
    type: UserType;
    aws_cognito_id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    post_code?: string;
    country?: string;
    city?: string;
    is_verified?: boolean;
    is_profile_updated?: boolean;
    created_by?: number;
}
