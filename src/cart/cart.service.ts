import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCart } from './dto/add-to-cart';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import { Model } from 'mongoose';
import { calculateCartItemPrice } from './helpers';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModal: Model<Cart>,
  ) {}

  async addToCart(createCartDto: AddToCart, user) {
    const existingCart = await this.cartModal
      .findOne({ user: user._id })
      .exec();

    createCartDto = {
      ...createCartDto,
      finalPrice: createCartDto.discounted_price * createCartDto.quantity,
    };
    if (!existingCart) {
      const cartPrice = calculateCartItemPrice([createCartDto]);
      const addedCart = new this.cartModal({
        user: user._id,
        items: [createCartDto],
        totalCartValue: cartPrice,
      });
      await addedCart.save();
      return addedCart;
    } else {
      const updatedItems: any = [...existingCart.items, createCartDto];
      const cartPrice = calculateCartItemPrice(updatedItems);

      const addedCart = await this.cartModal
        .findByIdAndUpdate(
          existingCart._id,
          { items: updatedItems, totalCartValue: cartPrice },
          { new: true },
        )
        .exec();
      return addedCart;
    }
  }

  async getCartItems(headers) {
    const { id } = headers;

    const cart = await this.cartModal.findById(id);

    if (!cart) {
      throw new NotFoundException('cart not found.');
    }

    return cart;
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
