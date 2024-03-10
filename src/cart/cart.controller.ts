import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCart } from './dto/add-to-cart';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  create(@Body() addToCart: AddToCart) {
    return this.cartService.addToCart(addToCart);
  }

  @Get('get-cart-items')
  findAll() {
    return this.cartService.findAll();
  }

  @Get('getcart-item:id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch('update-cart-item:id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete('delete-cart-item:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
