import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: any): Promise<import("../database/models/user.model").User>;
    findAll(page?: number, limit?: number): Promise<{
        users: import("../database/models/user.model").User[];
        total: number;
        pages: number;
    }>;
    search(query: string): Promise<import("../database/models/user.model").User[]>;
    getVendors(): Promise<import("../database/models/user.model").User[]>;
    findByType(type: string): Promise<import("../database/models/user.model").User[]>;
    findOne(id: number): Promise<import("../database/models/user.model").User>;
    update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<import("../database/models/user.model").User>;
    updateStatus(id: number, updateUserStatusDto: UpdateUserStatusDto, req: any): Promise<import("../database/models/user.model").User>;
    remove(id: number): Promise<void>;
}
