import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
    private jwtService: JwtService,
  ) {}

  findOne(filter: { where: { username?: string } }): Promise<Admin> {
    return this.adminModel.findOne({ ...filter });
  }

  async create(
    createAdminDto: CreateAdminDto,
  ): Promise<Admin | { warningMessage: string }> {
    const admin = new Admin();
    const existingByUserName = await this.findOne({
      where: { username: createAdminDto.username },
    });

    if (existingByUserName) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    admin.username = createAdminDto.username;
    admin.password = hashedPassword;

    return admin.save();
  }

  async login(createAdminDto: CreateAdminDto) {
    const existingByUserName = await this.findOne({
      where: { username: createAdminDto.username.toLowerCase() },
    });

    if (!existingByUserName) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      createAdminDto.password,
      existingByUserName.dataValues.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (passwordValid) {
      const payload = { username: existingByUserName.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return null;
  }
}
