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
import { MessagePattern } from '@nestjs/microservices';

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
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.devicesService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.devicesService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: number, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: number) {
    return this.devicesService.remove(id);
  }

  @MessagePattern('delete_devices')
  removeUserDevices(data: { userId: string }) {
    return this.devicesService.removeUserDevices(data.userId);
  }

  @Get('user-devices/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  findAllUserDevices(@Param('userId') userId: string) {
    return this.devicesService.getAllUserDevices(userId);
  }
}
