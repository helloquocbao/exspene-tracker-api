import { IsOptional, IsNumber } from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsNumber()
  hunger?: number;

  @IsOptional()
  @IsNumber()
  happiness?: number;

  @IsOptional()
  @IsNumber()
  energy?: number;
}
