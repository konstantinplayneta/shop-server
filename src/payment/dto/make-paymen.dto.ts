import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MakePaymentDto {
  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ example: 'заказ №1' })
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: 'https://localhost:3000/' })
  @IsOptional()
  readonly return_url?: string;
}
