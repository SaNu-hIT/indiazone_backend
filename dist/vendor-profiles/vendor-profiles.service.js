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
exports.VendorProfilesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const vendor_profile_model_1 = require("../database/models/vendor-profile.model");
const user_model_1 = require("../database/models/user.model");
let VendorProfilesService = class VendorProfilesService {
    constructor(vendorProfileModel, userModel, sequelize) {
        this.vendorProfileModel = vendorProfileModel;
        this.userModel = userModel;
        this.sequelize = sequelize;
    }
    async create(createVendorProfileDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const user = await this.userModel.findByPk(createVendorProfileDto.user_id);
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${createVendorProfileDto.user_id} not found`);
            }
            const existingProfile = await this.vendorProfileModel.findOne({
                where: { user_id: createVendorProfileDto.user_id },
            });
            if (existingProfile) {
                throw new common_1.ConflictException('Vendor profile already exists for this user');
            }
            const vendorProfile = await this.vendorProfileModel.create(createVendorProfileDto, { transaction });
            await user.update({ is_profile_updated: true }, { transaction });
            await transaction.commit();
            return this.findOne(vendorProfile.id);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.vendorProfileModel.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
        return {
            profiles: rows,
            total: count,
            pages: Math.ceil(count / limit),
        };
    }
    async findOne(id) {
        const vendorProfile = await this.vendorProfileModel.findByPk(id, {
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
        });
        if (!vendorProfile) {
            throw new common_1.NotFoundException(`Vendor profile with ID ${id} not found`);
        }
        return vendorProfile;
    }
    async findByUserId(userId) {
        const vendorProfile = await this.vendorProfileModel.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
        });
        if (!vendorProfile) {
            throw new common_1.NotFoundException(`Vendor profile for user ID ${userId} not found`);
        }
        return vendorProfile;
    }
    async update(id, updateVendorProfileDto, updatedBy) {
        const transaction = await this.sequelize.transaction();
        try {
            const vendorProfile = await this.findOne(id);
            const updateData = {
                ...updateVendorProfileDto,
                updated_by: updatedBy,
            };
            await vendorProfile.update(updateData, { transaction });
            await transaction.commit();
            return this.findOne(id);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async remove(id) {
        const transaction = await this.sequelize.transaction();
        try {
            const vendorProfile = await this.findOne(id);
            await this.userModel.update({ is_profile_updated: false }, { where: { id: vendorProfile.user_id }, transaction });
            await vendorProfile.destroy({ transaction });
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async searchProfiles(query) {
        return this.vendorProfileModel.findAll({
            where: {
                [this.sequelize.Op.or]: [
                    { business_name: { [this.sequelize.Op.iLike]: `%${query}%` } },
                    { company_name: { [this.sequelize.Op.iLike]: `%${query}%` } },
                    { contact_person: { [this.sequelize.Op.iLike]: `%${query}%` } },
                    { business_type: { [this.sequelize.Op.iLike]: `%${query}%` } },
                ],
            },
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
    async getProfilesByBusinessType(businessType) {
        return this.vendorProfileModel.findAll({
            where: { business_type: businessType },
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
    async getProfilesByCountry(country) {
        return this.vendorProfileModel.findAll({
            where: { country },
            include: [
                {
                    model: user_model_1.User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'status'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }
    async updateFiles(id, files, updatedBy) {
        const transaction = await this.sequelize.transaction();
        try {
            const vendorProfile = await this.findOne(id);
            const updateData = { updated_by: updatedBy };
            if (files.logo) {
                updateData.logo = files.logo;
            }
            if (files.certificate) {
                updateData.business_registration_certificate = files.certificate;
            }
            await vendorProfile.update(updateData, { transaction });
            await transaction.commit();
            return this.findOne(id);
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};
exports.VendorProfilesService = VendorProfilesService;
exports.VendorProfilesService = VendorProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(vendor_profile_model_1.VendorProfile)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, sequelize_typescript_1.Sequelize])
], VendorProfilesService);
//# sourceMappingURL=vendor-profiles.service.js.map