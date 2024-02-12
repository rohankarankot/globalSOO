import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum RegisteredAt {
  PROJECT_NEST = 'PROJECT_NEST',
  GOOGLE_REGISTERED = 'GOOGLE_REGISTERED',
}
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  deactivated: boolean;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: true })
  registeredAt: RegisteredAt;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string; // Note: Passwords should be hashed and not stored in plain text in production

  // You can add more fields and methods here as needed
}

export const UserModel = SchemaFactory.createForClass(User);
