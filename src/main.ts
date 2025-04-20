import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger("Main-Gateway");

  const app = await NestFactory.create(AppModule);

  //Nos ayuda  a definir todas las url que empiecen por "api"
  app.setGlobalPrefix('api');

  //Ayuda validar que el cuerpo del body venga como yo le estoy pidiendo en mi dto con ayuda del class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(`Products Microservices running on PORT: ${ envs.port }`);
}
bootstrap();
