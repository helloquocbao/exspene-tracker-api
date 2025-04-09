// pet.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async createPet(name: string, ownerId: string) {
    return this.prisma.pet.create({
      data: {
        name,
        ownerId,
      },
    });
  }

  async feedPet(id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet || !pet.isAlive) throw new NotFoundException('Pet not found or dead');

    return this.prisma.pet.update({
      where: { id },
      data: {
        hunger: { decrement: 10 },
        happiness: { increment: 5 },
        experience: { increment: 10 },
      },
    });
  }

  async playWithPet(id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet || !pet.isAlive) throw new NotFoundException('Pet not found or dead');

    return this.prisma.pet.update({
      where: { id },
      data: {
        happiness: { increment: 10 },
        hunger: { increment: 5 },
        experience: { increment: 15 },
      },
    });
  }

  async updatePetStats(id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id } });
    if (!pet || !pet.isAlive) return;

    const now = new Date();
    const minutes = (now.getTime() - new Date(pet.updatedAt).getTime()) / (1000 * 60);

    const hungerInc = Math.floor(minutes / 10);
    const happinessDec = hungerInc;

    const newHunger = pet.hunger + hungerInc;
    const newHappiness = pet.happiness - happinessDec;

    const isAlive = newHunger < 100 && newHappiness > 0;

    return this.prisma.pet.update({
      where: { id },
      data: {
        hunger: newHunger,
        happiness: newHappiness,
        isAlive,
      },
    });
  }

  async getPetById(id: string) {
    return this.prisma.pet.findUnique({ where: { id } });
  }
}
