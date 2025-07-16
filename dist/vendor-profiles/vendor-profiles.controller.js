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
exports.VendorProfilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const vendor_profiles_service_1 = require("./vendor-profiles.service");
const create_vendor_profile_dto_1 = require("./dto/create-vendor-profile.dto");
const update_vendor_profile_dto_1 = require("./dto/update-vendor-profile.dto");
const cognito_auth_guard_1 = require("../auth/guards/cognito-auth.guard");
let VendorProfilesController = class VendorProfilesController {
    constructor(vendorProfilesService) {
        this.vendorProfilesService = vendorProfilesService;
    }
    create(createVendorProfileDto, req) {
        return this.vendorProfilesService.create({
            ...createVendorProfileDto,
            created_by: req.user.id,
        });
    }
    findAll(page = 1, limit = 10) {
        return this.vendorProfilesService.findAll(page, limit);
    }
    search(query) {
        return this.vendorProfilesService.searchProfiles(query);
    }
    findByBusinessType(businessType) {
        return this.vendorProfilesService.getProfilesByBusinessType(businessType);
    }
    findByCountry(country) {
        return this.vendorProfilesService.getProfilesByCountry(country);
    }
    findByUserId(userId) {
        return this.vendorProfilesService.findByUserId(userId);
    }
    findOne(id) {
        return this.vendorProfilesService.findOne(id);
    }
    update(id, updateVendorProfileDto, req) {
        return this.vendorProfilesService.update(id, updateVendorProfileDto, req.user.id);
    }
    uploadFiles(id, files, req) {
        const fileUrls = {};
        if (files.logo && files.logo[0]) {
            fileUrls.logo = files.logo[0].path;
        }
        if (files.certificate && files.certificate[0]) {
            fileUrls.certificate = files.certificate[0].path;
        }
        return this.vendorProfilesService.updateFiles(id, fileUrls, req.user.id);
    }
    remove(id) {
        return this.vendorProfilesService.remove(id);
    }
};
exports.VendorProfilesController = VendorProfilesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vendor profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vendor profile successfully created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Vendor profile already exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vendor_profile_dto_1.CreateVendorProfileDto, Object]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vendor profiles with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profiles retrieved successfully' }),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Search vendor profiles' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profiles found' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('by-business-type/:businessType'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor profiles by business type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profiles retrieved successfully' }),
    __param(0, (0, common_1.Param)('businessType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "findByBusinessType", null);
__decorate([
    (0, common_1.Get)('by-country/:country'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor profiles by country' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profiles retrieved successfully' }),
    __param(0, (0, common_1.Param)('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "findByCountry", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor profile by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vendor profile not found' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor profile by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vendor profile not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update vendor profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profile updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vendor profile not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vendor_profile_dto_1.UpdateVendorProfileDto, Object]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/files'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1 },
        { name: 'certificate', maxCount: 1 },
    ])),
    (0, swagger_1.ApiOperation)({ summary: 'Upload vendor profile files' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Files uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vendor profile not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(cognito_auth_guard_1.CognitoAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete vendor profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor profile deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vendor profile not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VendorProfilesController.prototype, "remove", null);
exports.VendorProfilesController = VendorProfilesController = __decorate([
    (0, swagger_1.ApiTags)('Vendor Profiles'),
    (0, common_1.Controller)('vendor-profiles'),
    __metadata("design:paramtypes", [vendor_profiles_service_1.VendorProfilesService])
], VendorProfilesController);
//# sourceMappingURL=vendor-profiles.controller.js.map