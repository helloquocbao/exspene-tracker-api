// user.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto.email, dto.password);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
