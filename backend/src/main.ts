import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  await app.listen(port, () => {
    console.log('API server running on port: ', port);
  });
}
bootstrap();
