import { Model } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user.model';
export interface VendorProfileAttributes {
    id: number;
    user_id: number;
    business_type?: string;
    business_name?: string;
    company_name?: string;
    contact_person?: string;
    designation?: string;
    country?: string;
    city?: string;
    website?: string;
    business_registration_certificate?: string;
    gst_number?: string;
    address?: string;
    company_details?: string;
    whatsapp_number?: string;
    logo?: string;
    working_days?: string;
    employee_count?: number;
    payment_mode?: string;
    establishment?: number;
    created_by?: number;
    updated_by?: number;
    created_at: Date;
    updated_at: Date;
}
export interface VendorProfileCreationAttributes extends Optional<VendorProfileAttributes, 'id' | 'created_by' | 'updated_by' | 'created_at' | 'updated_at'> {
}
export declare class VendorProfile extends Model<VendorProfileAttributes, VendorProfileCreationAttributes> {
    id: number;
    user_id: number;
    business_type: string;
    business_name: string;
    company_name: string;
    contact_person: string;
    designation: string;
    country: string;
    city: string;
    website: string;
    business_registration_certificate: string;
    gst_number: string;
    address: string;
    company_details: string;
    whatsapp_number: string;
    logo: string;
    working_days: string;
    employee_count: number;
    payment_mode: string;
    establishment: number;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    user: User;
}
