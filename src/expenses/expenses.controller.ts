import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly service: ExpensesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateExpenseDto) {
    const userId = req.user.sub;
    return this.service.create({ ...dto, userId });
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
