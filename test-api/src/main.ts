import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

function transformErrors(_errors: ValidationError[]) {
  const errors = {};
  _errors.forEach((error) => {
    Object.assign(errors, {
      [error.property]: Object.values(error.constraints)[0],
    });
  });
  return errors;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      always: true,
      exceptionFactory: (_errors) => {
        const errors = transformErrors(_errors);
        throw new BadRequestException({ errors });
      },
    }),
  );
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
