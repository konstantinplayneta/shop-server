import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  sex: string;

  @Column
  age: string;

  @Column
  sity: string;

  @Column
  status: string;

  @Column
  description: string;

  @Column
  instagram: string;

  @Column
  onlyfans: string;

  @Column
  youtube: string;

  @Column
  twitch: string;

  @Column
  image: string;

  @Column
  background: string;
}
