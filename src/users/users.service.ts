import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async getProfile(id: number | string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username: id },
    });

    delete user.dataValues.password;

    return user;
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();
    const existingByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });
    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByUserName) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }

    if (existingByEmail) {
      return { warningMessage: 'Пользователь с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;
    user.sex = createUserDto.sex;
    user.age = createUserDto.age;
    user.sity = createUserDto.sity;
    user.status = createUserDto.status;
    user.description = createUserDto.description;
    user.instagram = createUserDto.instagram;
    user.onlyfans = createUserDto.onlyfans;
    user.youtube = createUserDto.youtube;
    user.twitch = createUserDto.twitch;
    user.image = createUserDto.image;
    user.subscribers = createUserDto.subscribers;

    return user.save();
  }

  async update(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const currentUser = await this.findOne({
      where: { email: createUserDto.email },
    });

    const checkUserByName = await this.findOne({
      where: { username: createUserDto.username },
    });

    if (
      currentUser?.dataValues?.id !== checkUserByName?.dataValues?.id &&
      !checkUserByName
    ) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }

    const user = new User();

    console.log(123, createUserDto);

    if (!createUserDto.password) {
      console.log(await bcrypt.hash(createUserDto.password, 10));
      createUserDto.password = currentUser.password;
    } else {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.sex = createUserDto.sex;
    user.age = createUserDto.age;
    user.sity = createUserDto.sity;
    user.status = createUserDto.status;
    user.description = createUserDto.description;
    user.instagram = createUserDto.instagram;
    user.onlyfans = createUserDto.onlyfans;
    user.youtube = createUserDto.youtube;
    user.twitch = createUserDto.twitch;
    user.image = createUserDto.image;
    user.subscribers = createUserDto.subscribers;

    return currentUser.update(createUserDto);
  }
}
