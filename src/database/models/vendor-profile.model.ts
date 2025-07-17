import { Column, Model, Table, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, Index } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from './user.model';

// Define the attributes interface
export interface VendorProfileAttributes {
  id: number;
  user_id: number;
  business_type?: string;
  business_name?: string;
  company_name?: string;
  contact_person?: string;
  designation?: string;
  country?: string;
  city?: string;
  website?: string;
  business_registration_certificate?: string;
  gst_number?: string;
  address?: string;
  company_details?: string;
  whatsapp_number?: string;
  logo?: string;
  working_days?: string;
  employee_count?: number;
  payment_mode?: string;
  establishment?: number;
  created_by?: number;
  updated_by?: number;
  created_at: Date;
  updated_at: Date;
}

// Define creation attributes (fields that are optional during creation)
export interface VendorProfileCreationAttributes extends Optional<VendorProfileAttributes,
  'id' | 'created_by' | 'updated_by' | 'created_at' | 'updated_at'
> {}

@Table({
  tableName: 'vendor_profiles',
  timestamps: true,
  underscored: true,
})
export class VendorProfile extends Model<VendorProfileAttributes, VendorProfileCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Index
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  business_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  business_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  company_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contact_person: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  designation: string;

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
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  website: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  business_registration_certificate: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gst_number: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  company_details: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[+]?[\d\s\-()]+$/,
    },
  })
  whatsapp_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  working_days: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
    },
  })
  employee_count: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  payment_mode: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 1900,
      max: new Date().getFullYear(),
    },
  })
  establishment: number;

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
  @BelongsTo(() => User)
  user: User;
}