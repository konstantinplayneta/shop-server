import { Injectable } from '@nestjs/common';
import { Order } from './orders.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<Order> {
    return this.orderModel.findOne({ ...filter });
  }

  async findOneByName(id: string): Promise<Order> {
    return this.orderModel.findOne({
      where: { order: id },
    });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Order[] }> {
    return this.orderModel.findAndCountAll({
      limit: 20,
      where: { order: { [Op.like]: `%${str}%` } },
    });
  }

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<Order | { warningMessage: string }> {
    const order = new Order();

    // if (existingByOrder) {
    //   return { existingByOrder: 'Заказ с таким номером уже существует' };
    // }

    order.order = createOrderDto.order;
    order.order_inner = createOrderDto.order_inner;
    order.total_price = createOrderDto.total_price;
    order.description = createOrderDto.description;
    order.owner = createOrderDto.owner;
    order.gift = createOrderDto.gift;
    order.status = createOrderDto.status;
    order.data = createOrderDto.data;
    order.recipient = createOrderDto.recipient;

    return order.save();
  }
}
