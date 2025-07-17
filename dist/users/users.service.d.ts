import { Sequelize } from 'sequelize-typescript';
import { User, UserStatus } from '../database/models/user.model';
import { VendorProfile } from '../database/models/vendor-profile.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userModel;
    private vendorProfileModel;
    private sequelize;
    constructor(userModel: typeof User, vendorProfileModel: typeof VendorProfile, sequelize: Sequelize);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(page?: number, limit?: number): Promise<{
        users: User[];
        total: number;
        pages: number;
    }>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByCognitoId(cognitoId: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto, updatedBy?: number): Promise<User>;
    updateStatus(id: number, status: UserStatus, updatedBy?: number): Promise<User>;
    remove(id: number): Promise<void>;
    getUsersByType(userType: string): Promise<User[]>;
    getVendorUsers(): Promise<User[]>;
    searchUsers(query: string): Promise<User[]>;
}
