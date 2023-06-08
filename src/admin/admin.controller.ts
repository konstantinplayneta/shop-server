import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  LoginAdminRequest,
  LoginAdminResponse,
  SignupAdminResponse,
} from './types';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBody({ type: LoginAdminRequest })
  @ApiOkResponse({ type: LoginAdminResponse })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.login(createAdminDto);
  }

  @ApiOkResponse({ type: SignupAdminResponse })
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}
