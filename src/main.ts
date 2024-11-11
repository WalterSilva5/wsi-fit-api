import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn']
  });
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
    preflightContinue: false
  });

  const config = new DocumentBuilder()
    .setVersion(process.env.PACKAGE_VERSION || '1.0')
    .setTitle('Xavier API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger/rest', app, document, {
    swaggerOptions: {
      explorer: true,
      swaggerOptions: {
        supportedSubmitMethods: ['get', 'post', 'put', 'delete']
      }
    }
  });
  const PORT =5000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => {
    const logger = new Logger('NestApplication');
    logger.log(`Listenning on port ${PORT}`);
  });
}
bootstrap();
