import { Sequelize } from 'sequelize-typescript';
import { VendorProfile } from '../database/models/vendor-profile.model';
import { User } from '../database/models/user.model';
import { CreateVendorProfileDto } from './dto/create-vendor-profile.dto';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
export declare class VendorProfilesService {
    private vendorProfileModel;
    private userModel;
    private sequelize;
    constructor(vendorProfileModel: typeof VendorProfile, userModel: typeof User, sequelize: Sequelize);
    create(createVendorProfileDto: CreateVendorProfileDto): Promise<VendorProfile>;
    findAll(page?: number, limit?: number): Promise<{
        profiles: VendorProfile[];
        total: number;
        pages: number;
    }>;
    findOne(id: number): Promise<VendorProfile>;
    findByUserId(userId: number): Promise<VendorProfile>;
    update(id: number, updateVendorProfileDto: UpdateVendorProfileDto, updatedBy?: number): Promise<VendorProfile>;
    remove(id: number): Promise<void>;
    searchProfiles(query: string): Promise<VendorProfile[]>;
    getProfilesByBusinessType(businessType: string): Promise<VendorProfile[]>;
    getProfilesByCountry(country: string): Promise<VendorProfile[]>;
    updateFiles(id: number, files: {
        logo?: string;
        certificate?: string;
    }, updatedBy?: number): Promise<VendorProfile>;
}
