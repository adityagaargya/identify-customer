import { IsString, IsNumber } from 'class-validator';

export class ContactDto {
  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;
}
