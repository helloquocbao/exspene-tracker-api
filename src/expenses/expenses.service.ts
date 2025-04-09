import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';

const prisma = new PrismaClient();

@Injectable()
export class ExpensesService {
  async create(data: CreateExpenseDto & { userId: number }) {
    return prisma.expense.create({ data });
  }

  async findAll() {
    return prisma.expense.findMany({
      include: { category: true },
    });
  }
  async findByCategory(categoryId: number) {
    return prisma.expense.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }
  async findOne(id: number) {
    return prisma.expense.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: number, dto: CreateExpenseDto) {
    return prisma.expense.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return prisma.expense.delete({
      where: { id },
    });
  }

  async removeByCategory(categoryId: number) {
    return prisma.expense.deleteMany({
      where: { categoryId },
    });
  }
}
