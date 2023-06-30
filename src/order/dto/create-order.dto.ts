import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'ivan123' })
  @IsNotEmpty()
  readonly order: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly order_inner: string;

  @ApiProperty({ example: '1000' })
  @IsNotEmpty()
  readonly total_price: number;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly owner: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly gift: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly data: string;

  @ApiProperty({ example: 'ivan@gmail.com' })
  @IsNotEmpty()
  readonly recipient: string;
}
