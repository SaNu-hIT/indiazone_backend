import { Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { VendorProfile } from './vendor-profile.model';
export declare enum UserType {
    VENDOR = "vendor",
    CUSTOMER = "customer",
    ADMIN = "admin"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending"
}
export interface UserAttributes {
    id: number;
    type: UserType;
    aws_cognito_id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    post_code?: string;
    country?: string;
    city?: string;
    is_verified: boolean;
    verified_at?: Date;
    is_profile_updated: boolean;
    is_profile_reverified: boolean;
    profile_reverified_at?: Date;
    status: UserStatus;
    created_by?: number;
    updated_by?: number;
    created_at: Date;
    updated_at: Date;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'is_verified' | 'verified_at' | 'is_profile_updated' | 'is_profile_reverified' | 'profile_reverified_at' | 'status' | 'created_by' | 'updated_by' | 'created_at' | 'updated_at'> {
}
export declare class User extends Model<UserAttributes, UserCreationAttributes> {
    id: number;
    type: UserType;
    aws_cognito_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    post_code: string;
    country: string;
    city: string;
    is_verified: boolean;
    verified_at: Date;
    is_profile_updated: boolean;
    is_profile_reverified: boolean;
    profile_reverified_at: Date;
    status: UserStatus;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    vendor_profile: VendorProfile;
}
