import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PubSub } from 'apollo-server-express';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      installSubscriptionHandlers: true, // permitir las subscripciones
      subscriptions: {
        // configuración de timeout de las subs
        keepAlive: 5000,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp', // maneja las fechas con TS
      },
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
