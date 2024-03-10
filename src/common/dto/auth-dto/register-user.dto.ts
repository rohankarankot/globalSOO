import { ApiExtraModels } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsOptional,
  Matches,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { LoginDto } from './login-user.dto';
import { passwordCriteriaRegex } from 'src/lib/regex';
import { CONSTANTS } from 'src/auth/constants';
import { RegisteredAt } from 'src/lib/common';

@ApiExtraModels(LoginDto)
export class RegistrationDto {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsEnum(RegisteredAt, { message: 'Please enter correct source of register' })
  readonly registeredAt: RegisteredAt;

  @IsString()
  @MinLength(6)
  // @Matches(passwordCriteriaRegex, {
  //   message: CONSTANTS.passwordCriteria,
  // })
  password: string;

  @IsBoolean()
  deactivated: boolean = false;
}

export class UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
  password?: string;
}
