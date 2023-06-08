import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  readonly password: string;
}
