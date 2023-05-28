import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { IGiftsFilter, IGiftsQuery } from './types';
import { Gifts } from './gifts.model';

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel(Gifts)
    private giftsModel: typeof Gifts,
  ) {}

  async paginateAndFilter(
    query: IGiftsQuery,
  ): Promise<{ count: number; rows: Gifts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IGiftsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.boiler) {
      filter.gift_manufacturer = JSON.parse(decodeURIComponent(query.boiler));
    }

    if (query.parts) {
      filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.giftsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: Gifts[] }> {
    return this.giftsModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: Gifts[] }> {
    return this.giftsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<Gifts> {
    return this.giftsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Gifts> {
    return this.giftsModel.findOne({
      where: { name },
    });
  }

  async searchByString(str: string): Promise<{ count: number; rows: Gifts[] }> {
    return this.giftsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
