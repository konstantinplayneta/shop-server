import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  LoginAdminRequest,
  LoginAdminResponse,
  SignupAdminResponse,
} from './types';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Response } from 'express';
import { AuthGuardAdmin } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBody({ type: LoginAdminRequest })
  @ApiOkResponse({ type: LoginAdminResponse })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const { access_token } = await this.adminService.login(createAdminDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return;
  }

  @UseGuards(AuthGuardAdmin)
  @Get('check-access')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: SignupAdminResponse })
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}
