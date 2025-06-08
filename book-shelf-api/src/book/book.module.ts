import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/book.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { ComentarioLibro } from './entities/comentario-libro.entity';
import { ReaccionLibro } from './entities/reaccion-libro.entity';

@Module({
  controllers: [BookController],
  providers: [BookService, JwtStrategy, PassportModule, JwtModule],
  imports: [ConfigModule,
      TypeOrmModule.forFeature([Libro, ComentarioLibro, ReaccionLibro]),
      AuthModule,
    ],
  exports: [BookService, TypeOrmModule],

})
export class BookModule {}
