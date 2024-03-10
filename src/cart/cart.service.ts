import { Injectable } from '@nestjs/common';
import { AddToCart } from './dto/add-to-cart';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  addToCart(createCartDto: AddToCart) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
