import { VendorProfilesService } from './vendor-profiles.service';
import { CreateVendorProfileDto } from './dto/create-vendor-profile.dto';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
export declare class VendorProfilesController {
    private readonly vendorProfilesService;
    constructor(vendorProfilesService: VendorProfilesService);
    create(createVendorProfileDto: CreateVendorProfileDto, req: any): Promise<import("../database/models/vendor-profile.model").VendorProfile>;
    findAll(page?: number, limit?: number): Promise<{
        profiles: import("../database/models/vendor-profile.model").VendorProfile[];
        total: number;
        pages: number;
    }>;
    search(query: string): Promise<import("../database/models/vendor-profile.model").VendorProfile[]>;
    findByBusinessType(businessType: string): Promise<import("../database/models/vendor-profile.model").VendorProfile[]>;
    findByCountry(country: string): Promise<import("../database/models/vendor-profile.model").VendorProfile[]>;
    findByUserId(userId: number): Promise<import("../database/models/vendor-profile.model").VendorProfile>;
    findOne(id: number): Promise<import("../database/models/vendor-profile.model").VendorProfile>;
    update(id: number, updateVendorProfileDto: UpdateVendorProfileDto, req: any): Promise<import("../database/models/vendor-profile.model").VendorProfile>;
    uploadFiles(id: number, files: {
        logo?: Express.Multer.File[];
        certificate?: Express.Multer.File[];
    }, req: any): Promise<import("../database/models/vendor-profile.model").VendorProfile>;
    remove(id: number): Promise<void>;
}
