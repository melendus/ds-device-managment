import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateDeviceDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address?: string;

  @IsNumber()
  energyConsumptionPerHour?: number;

  @IsNumber()
  userId?: number;
}
