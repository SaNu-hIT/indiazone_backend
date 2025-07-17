"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = require("sequelize");
const user_model_1 = require("../database/models/user.model");
const vendor_profile_model_1 = require("../database/models/vendor-profile.model");
let UsersService = class UsersService {
    constructor(userModel, vendorProfileModel, sequelize) {
        this.userModel = userModel;
        this.vendorProfileModel = vendorProfileModel;
        this.sequelize = sequelize;
    }
    async create(createUserDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const existingUser = await this.userModel.findOne({
                where: {
                    email: createUserDto.email,
                },
            });
            if (existingUser) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const existingCognitoUser = await this.userModel.findOne({
                where: {
                    aws_cognito_id: createUserDto.aws_cognito_id,
                },
            });
            if (existingCognitoUser) {
                throw new common_1.ConflictException('User with this Cognito ID already exists');
            }
            const user = await this.userModel.create(createUserDto, { transaction });
            await transaction.commit();
            return user;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.userModel.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
            order: [['created_at', 'DESC']],
        });
        return {
            users: rows,
            total: count,
            pages: Math.ceil(count / limit),
        };
    }
    async findOne(id) {
        const user = await this.userModel.findByPk(id, {
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({
            where: { email },
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async findByCognitoId(cognitoId) {
        return this.userModel.findOne({
            where: { aws_cognito_id: cognitoId },
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
        });
    }
    async update(id, updateUserDto, updatedBy) {
        const transaction = await this.sequelize.transaction();
        try {
            const user = await this.findOne(id);
            const updateData = {
                ...updateUserDto,
                updated_by: updatedBy,
            };
            await user.update(updateData, { transaction });
            await transaction.commit();
            return user;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async updateStatus(id, status, updatedBy) {
        const transaction = await this.sequelize.transaction();
        try {
            const user = await this.findOne(id);
            await user.update({
                status,
                updated_by: updatedBy,
                ...(status === user_model_1.UserStatus.ACTIVE && {
                    is_verified: true,
                    verified_at: new Date()
                })
            }, { transaction });
            await transaction.commit();
            return user;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async remove(id) {
        const transaction = await this.sequelize.transaction();
        try {
            const user = await this.findOne(id);
            await user.destroy({ transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async getUsersByType(userType) {
        return this.userModel.findAll({
            where: { type: userType },
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
    async getVendorUsers() {
        return this.userModel.findAll({
            where: { type: 'vendor' },
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: true,
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
    async searchUsers(query) {
        return this.userModel.findAll({
            where: {
                [sequelize_2.Op.or]: [
                    { first_name: { [sequelize_2.Op.iLike]: `%${query}%` } },
                    { last_name: { [sequelize_2.Op.iLike]: `%${query}%` } },
                    { email: { [sequelize_2.Op.iLike]: `%${query}%` } },
                ],
            },
            include: [
                {
                    model: vendor_profile_model_1.VendorProfile,
                    as: 'vendor_profile',
                    required: false,
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(vendor_profile_model_1.VendorProfile)),
    __metadata("design:paramtypes", [Object, Object, sequelize_typescript_1.Sequelize])
], UsersService);
//# sourceMappingURL=users.service.js.map