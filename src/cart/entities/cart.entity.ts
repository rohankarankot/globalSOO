import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/common/schema/user.schema';
import { Category, RegisteredAt } from 'src/lib/common';

export type CartDocument = Cart & Document;

@Schema({
  timestamps: true,
})
export class Cart extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string[];

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discounted_price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  color: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CartModal = SchemaFactory.createForClass(Cart);
