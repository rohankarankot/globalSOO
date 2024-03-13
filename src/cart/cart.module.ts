import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartModel } from './entities/cart.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartModel }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
