import { IsString, IsInt } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string

  @IsString()
  password: string
}