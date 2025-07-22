
import { Controller, Post, Body, UseGuards, Get, HttpCode, HttpStatus, Delete, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    // Admins create users with the default 'staff' role
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user.toObject();
    return result;
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (!result) {
        throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return result;
  }
}