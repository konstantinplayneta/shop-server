import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @Column
  order: string;

  @Column
  order_inner: string;

  @Column({ defaultValue: 0 })
  total_price: number;

  @Column
  description: string;

  @Column
  owner: string;

  @Column
  gift: string;

  @Column
  status: string;

  @Column
  data: string;

  @Column
  recipient: string;
}
