import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { Document, Types } from 'mongoose';

// Define a schema for the items within the cart
@Schema({
  timestamps: true,
})
export class CartItem extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  product_id: string;

  @Prop({ required: true, enum: ['MEN', 'WOMEN', 'KIDS'] })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discounted_price: number;

  @Prop({ required: true })
  finalPrice: number;

  @Prop({ required: true })
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

// Define a schema for the cart
@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ type: [CartItemSchema], required: true })
  items: CartItem[];

  @Prop({ required: true })
  totalCartValue: number;
}

export const CartModel = SchemaFactory.createForClass(Cart);
