import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { User } from 'src/common/schema/user.schema';
import { Category } from 'src/lib/common';

export class AddToCart {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;

  image: string[];

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  readonly category: Category;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  discounted_price: number;

  @IsNotEmpty()
  quantity: number;

  color: string[];

  userName: string = '';

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
