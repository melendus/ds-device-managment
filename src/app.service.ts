import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('Users_MICROSERVICE') private readonly clientDevice: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async helloWordMicroService() {
    const data = await firstValueFrom(
      this.clientDevice.send('hello_world', {}),
    );
    console.log('data------>', data);
  }
}
