import { PartialType } from '@nestjs/swagger';
import { AddToCart } from './add-to-cart';

export class UpdateCartDto extends PartialType(AddToCart) {}
