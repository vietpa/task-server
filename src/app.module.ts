import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PrismaService } from './prisma.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserService } from './auth/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    EventEmitterModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController, AuthController, TasksController],
  providers: [
    AppService,
    PrismaService,
    UserService,
    AuthService,
    TasksService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
