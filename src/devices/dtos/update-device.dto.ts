import { CreateDeviceDto } from './create-device.dto';
import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateDeviceDto extends CreateDeviceDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  energyConsumptionPerHour?: number;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
