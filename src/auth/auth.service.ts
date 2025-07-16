import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserType } from '../database/models/user.model';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityServiceProvider;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    this.cognitoClient = new CognitoIdentityServiceProvider({
      region: this.configService.get('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async validateUser(token: string): Promise<any> {
    try {
      const params = {
        AccessToken: token,
      };

      const result = await this.cognitoClient.getUser(params).promise();
      
      // Extract user information from Cognito response
      const email = result.UserAttributes.find(attr => attr.Name === 'email')?.Value;
      const cognitoUserId = result.Username;

      if (!email || !cognitoUserId) {
        throw new UnauthorizedException('Invalid token');
      }

      // Check if user exists in our database
      let user = await this.usersService.findByCognitoId(cognitoUserId);

      if (!user) {
        // Create user if doesn't exist
        const createUserDto: CreateUserDto = {
          type: UserType.CUSTOMER, // Default type
          aws_cognito_id: cognitoUserId,
          email,
          // Extract other attributes if available
          first_name: result.UserAttributes.find(attr => attr.Name === 'given_name')?.Value,
          last_name: result.UserAttributes.find(attr => attr.Name === 'family_name')?.Value,
          phone: result.UserAttributes.find(attr => attr.Name === 'phone_number')?.Value,
        };

        user = await this.usersService.create(createUserDto);
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signUp(email: string, password: string, userType: UserType): Promise<any> {
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'custom:user_type',
          Value: userType,
        },
      ],
    };

    try {
      const result = await this.cognitoClient.signUp(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    try {
      const result = await this.cognitoClient.initiateAuth(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async confirmSignUp(email: string, confirmationCode: string): Promise<any> {
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    try {
      const result = await this.cognitoClient.confirmSignUp(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async resendConfirmationCode(email: string): Promise<any> {
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
    };

    try {
      const result = await this.cognitoClient.resendConfirmationCode(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async forgotPassword(email: string): Promise<any> {
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
    };

    try {
      const result = await this.cognitoClient.forgotPassword(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async confirmForgotPassword(email: string, confirmationCode: string, newPassword: string): Promise<any> {
    const params = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
    };

    try {
      const result = await this.cognitoClient.confirmForgotPassword(params).promise();
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}