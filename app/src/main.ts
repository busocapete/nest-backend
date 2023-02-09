import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  //Include versioning i.e. api/v1/...
  //Not doing so will lead to issues
  //especially if serving mobile apps
  //as users don't often update the
  //app on their device.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  //changing port to 8000
  await app.listen(8000);
}
bootstrap();
