import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEnum,
  IsEmpty,
  IsNumber,
} from 'class-validator';
import { User } from 'src/common/schema/user.schema';
import { Category } from 'src/lib/common';

export class AddToCart {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  sku: string;

  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  readonly category: Category;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Discounted price must be a number' })
  discounted_price: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  finalPrice?: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
