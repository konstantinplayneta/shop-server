import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { type } from 'os';
import { ProfileRequest, SignupResponse } from 'src/users/types';
import { OrderRequest } from './types';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('find/:id')
  @ApiOkResponse({ type: OrderRequest })
  getOne(@Param('id') id: string) {
    return this.ordersService.findOneByName(id);
  }

  @ApiOkResponse({ type })
  @ApiBody({ type })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.ordersService.searchByString(search);
  }

  @ApiOkResponse({ type })
  @ApiBody({ type })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    console.log(name);

    return this.ordersService.findOneByName(name);
  }
}
