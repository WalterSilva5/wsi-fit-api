import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { HTTPLoggerMiddleware } from './middleware/logger.middleware';
import { AllExceptionsFilter } from './exceptions/exception.filter';
import { APP_GUARD, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './database/prisma/prisma.module';
import { AppException } from './exceptions/app.exception';
import { AtGuard } from './crud/auth/guards/at.guard';
import { UserModule } from './crud/user/user.module';
import { AuthModule } from './crud/auth/auth.module';
import { AppController } from './app.controller';
import { MuscleGroupModule } from './crud/muscle-group/muscle-group.module';
import { ExerciseModule } from './crud/exercise/exercise.module';
import { WorkoutModule } from './crud/workout/workout.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (errors) => {
          const formattedErrors = errors.map((error) => ({
            field: error.property,
            value: error.value,
            issues: Object.values(error.constraints || {}),
          }));

          console.error('Validation errors:', formattedErrors);

          return new AppException({
            message: 'Validation failed',
            errors: formattedErrors,
          });
        },
      }),
    },
  ],
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    MuscleGroupModule,
    ExerciseModule,
    WorkoutModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
