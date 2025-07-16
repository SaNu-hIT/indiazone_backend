import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorProfilesService } from './vendor-profiles.service';
import { VendorProfilesController } from './vendor-profiles.controller';
import { VendorProfile } from '../database/models/vendor-profile.model';
import { User } from '../database/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([VendorProfile, User])],
  controllers: [VendorProfilesController],
  providers: [VendorProfilesService],
  exports: [VendorProfilesService],
})
export class VendorProfilesModule {}