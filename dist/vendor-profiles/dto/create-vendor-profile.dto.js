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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateVendorProfileDto {
}
exports.CreateVendorProfileDto = CreateVendorProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVendorProfileDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business type',
        example: 'Technology',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "business_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business name',
        example: 'Tech Solutions Inc.',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "business_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company name',
        example: 'Tech Solutions LLC',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "company_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person',
        example: 'John Doe',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "contact_person", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Designation',
        example: 'CEO',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country',
        example: 'United States',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City',
        example: 'New York',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Website URL',
        example: 'https://techsolutions.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business registration certificate path',
        example: '/uploads/certificate.pdf',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "business_registration_certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'GST number',
        example: 'GST123456789',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "gst_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business address',
        example: '123 Main St, New York, NY 10001',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company details',
        example: 'We provide cutting-edge technology solutions...',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "company_details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'WhatsApp number',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "whatsapp_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logo path',
        example: '/uploads/logo.png',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Working days',
        example: 'Monday to Friday',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "working_days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee count',
        example: 50,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateVendorProfileDto.prototype, "employee_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment mode',
        example: 'Bank Transfer, Credit Card',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVendorProfileDto.prototype, "payment_mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Establishment year',
        example: 2020,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear()),
    __metadata("design:type", Number)
], CreateVendorProfileDto.prototype, "establishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creator user ID',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVendorProfileDto.prototype, "created_by", void 0);
//# sourceMappingURL=create-vendor-profile.dto.js.map