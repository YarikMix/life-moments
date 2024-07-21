import { IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { E_Gender } from '@entities/user/types';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  firstName?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  lastName?: string

  // @IsISO8601()
  // birthDate: Date
  //
  // @IsNotEmpty()
  // @IsEnum(E_Gender)
  // gender: E_Gender
}