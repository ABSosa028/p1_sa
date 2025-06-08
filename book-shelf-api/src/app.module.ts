import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CollectionModule } from './collection/collection.module';
import { AuthModule } from './auth/auth.module';
import { HistorialComentarioModule } from './historial-comentario/historial-comentario.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalLibreryModule } from './personal-librery/personal-librery.module';

@Module({
  imports: [BookModule, CollectionModule, AuthModule, HistorialComentarioModule, ConfigModule.forRoot({isGlobal: true,}), 
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
     ssl: { rejectUnauthorized: false },
  }), PersonalLibreryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
