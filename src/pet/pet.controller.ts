// pet.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Post()
  create(@Body() dto: CreatePetDto) {
    return this.petService.createPet(dto.name, dto.ownerId);
  }

  @Post(':id/feed')
  feed(@Param('id') id: string) {
    return this.petService.feedPet(id);
  }

  @Post(':id/play')
  play(@Param('id') id: string) {
    return this.petService.playWithPet(id);
  }

  @Get(':id')
  getPet(@Param('id') id: string) {
    return this.petService.getPetById(id);
  }
}
