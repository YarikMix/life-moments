import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(1)
  firstName: string

  @IsString()
  @MinLength(1)
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(1)
  phone: string

  @IsString()
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  //   minUppercase: 1
  // })
  password: string

  // @IsNotEmpty()
  // address: string
  //
  // @IsNotEmpty()
  // @IsEnum(E_Gender)
  // gender: E_Gender
  //
  // @IsISO8601()
  // birthDate: Date
  //
  // @Match('password', {message: "passwords are not equal"})
  // passwordConfirm: string
}
