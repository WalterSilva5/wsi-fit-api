import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
    preflightContinue: false,
  });

  // const config = new DocumentBuilder()
  //   .setTitle('WSI Fit API') // Ajustado para garantir consistência
  //   .setDescription('API documentation for WSI Fit')
  //   .setVersion(process.env.PACKAGE_VERSION || '1.0')
  //   .addBearerAuth()
  //   .build();

  // console.log('Swagger configuration initialized'); // Log para verificar o processo

  // const document = SwaggerModule.createDocument(app, config, {
  //   include: [AppModule],
  // });

  // console.log('Swagger document created'); // Verificar se o documento foi criado

  // SwaggerModule.setup('docs', app, document, {
  //   swaggerOptions: {
  //     explorer: true,
  //     swaggerOptions: {
  //       supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
  //     },
  //   },
  // });

  const port = 3000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => {
    const logger = new Logger('NestApplication');
    logger.log(`App running on port ${port}`);
  });
}
bootstrap();
