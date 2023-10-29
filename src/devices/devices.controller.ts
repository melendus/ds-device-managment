import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { DevicesService } from './devices.service';
import { AuthGuard } from '../public/guards/auth.guard';
import { RolesGuard } from '../public/guards/roles.guard';
import { Roles } from '../public/decorators/roles.decorator';
import { Role } from '../public/enums/role.enum';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.devicesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(id);
  }
}
