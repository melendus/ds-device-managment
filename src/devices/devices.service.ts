import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { In, Repository } from 'typeorm';
import { UpdateDeviceDto } from './dtos/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}
  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.save(createDeviceDto);
  }

  findOne(id: number) {
    return this.deviceRepository.findOneBy({ id });
  }

  findAll() {
    return this.deviceRepository.find();
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    await this.deviceRepository.update(id, updateDeviceDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.deviceRepository.delete(id);
  }

  async removeUserDevices(userId: string) {
    const foundDevices = await this.deviceRepository.findBy({
      userId: +userId,
    });

    foundDevices.forEach((device) => {
      device.userId = null;
      this.deviceRepository.save(device);
    });

    return foundDevices;
  }

  async getAllUserDevices(userId: string) {
    return await this.deviceRepository.findBy({
      userId: +userId,
    });
  }
}
