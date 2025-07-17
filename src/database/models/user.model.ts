import { Column, Model, Table, DataType, HasOne, CreatedAt, UpdatedAt, Index } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { VendorProfile } from './vendor-profile.model';

export enum UserType {
  VENDOR = 'vendor',
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

// Define the attributes interface
export interface UserAttributes {
  id: number;
  type: UserType;
  aws_cognito_id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  post_code?: string;
  country?: string;
  city?: string;
  is_verified: boolean;
  verified_at?: Date;
  is_profile_updated: boolean;
  is_profile_reverified: boolean;
  profile_reverified_at?: Date;
  status: UserStatus;
  created_by?: number;
  updated_by?: number;
  created_at: Date;
  updated_at: Date;
}

// Define creation attributes (fields that are optional during creation)
export interface UserCreationAttributes extends Optional<UserAttributes, 
  'id' | 'is_verified' | 'verified_at' | 'is_profile_updated' | 'is_profile_reverified' | 
  'profile_reverified_at' | 'status' | 'created_by' | 'updated_by' | 'created_at' | 'updated_at'
> {}

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
  })
  type: UserType;

  @Index
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  aws_cognito_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;

  @Index
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[+]?[\d\s\-()]+$/,
    },
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  post_code: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_verified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  verified_at: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_profile_updated: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_profile_reverified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  profile_reverified_at: Date;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.PENDING,
  })
  status: UserStatus;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  created_by: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updated_by: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  // Associations
  @HasOne(() => VendorProfile)
  vendor_profile: VendorProfile;
}