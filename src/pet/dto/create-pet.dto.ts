// create-pet.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  ownerId: string;
}
