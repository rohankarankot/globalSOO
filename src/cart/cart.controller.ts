import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCart } from './dto/add-to-cart';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ObjectIdValidationInterceptor } from 'src/common/interceptors/valid-object-id';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-to-cart')
  create(@Body() addToCart: AddToCart, @Req() req) {
    return this.cartService.addToCart(addToCart, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ObjectIdValidationInterceptor)
  @Get('get-cart-items')
  findAll(@Headers() headers) {
    return this.cartService.getCartItems(headers);
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
