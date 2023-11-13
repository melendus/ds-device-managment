import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microServiceUsers = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 9001,
    },
  });

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.startAllMicroservices();
  await app.listen(8081, () => {
    console.log('Server is running on port 8081');
  });
}

bootstrap();
