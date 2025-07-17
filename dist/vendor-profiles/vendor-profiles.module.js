"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const vendor_profiles_service_1 = require("./vendor-profiles.service");
const vendor_profiles_controller_1 = require("./vendor-profiles.controller");
const vendor_profile_model_1 = require("../database/models/vendor-profile.model");
const user_model_1 = require("../database/models/user.model");
let VendorProfilesModule = class VendorProfilesModule {
};
exports.VendorProfilesModule = VendorProfilesModule;
exports.VendorProfilesModule = VendorProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([vendor_profile_model_1.VendorProfile, user_model_1.User])],
        controllers: [vendor_profiles_controller_1.VendorProfilesController],
        providers: [vendor_profiles_service_1.VendorProfilesService],
        exports: [vendor_profiles_service_1.VendorProfilesService],
    })
], VendorProfilesModule);
//# sourceMappingURL=vendor-profiles.module.js.map