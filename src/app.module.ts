import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact/entities/contact.entities';

const connect = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 8081,
  username: 'root',
  password: '123',
};
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8081,
      username: 'root',
      password: '123',
      database: 'projects',
      entities: [ContactEntity],
    }),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
