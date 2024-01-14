import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as yargs from 'yargs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const argv = yargs.options({
    port: { type: 'number', default: 8080 },
  }).argv as { port: number }; // Define the type explicitly
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(argv.port);
}
bootstrap();
