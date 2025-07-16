import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoStrategy } from './strategies/cognito.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cognito' }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CognitoStrategy],
  exports: [AuthService],
})
export class AuthModule {}