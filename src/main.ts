import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoErrorFilter } from './mongoError.filter';
import { ValidationErrorFilter } from './validationError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongoErrorFilter(), new ValidationErrorFilter());

  await app.listen(3000);
}

bootstrap();
