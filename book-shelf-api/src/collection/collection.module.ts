import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { BookModule } from 'src/book/book.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [ ConfigModule,
    TypeOrmModule.forFeature([Collection]), BookModule, AuthModule], 
})
export class CollectionModule {}
