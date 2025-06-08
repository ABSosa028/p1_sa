import { Module } from '@nestjs/common';
import { PersonalLibreryService } from './personal-librery.service';
import { PersonalLibreryController } from './personal-librery.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalLibrery } from './entities/personal-librery.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { BookModule } from 'src/book/book.module';

@Module({
  controllers: [PersonalLibreryController],
  providers: [PersonalLibreryService, JwtStrategy, PassportModule, JwtModule],
  imports: [ConfigModule,
    TypeOrmModule.forFeature([PersonalLibrery]),
  AuthModule, BookModule ],
  exports: [PersonalLibreryService, TypeOrmModule]
})
export class PersonalLibreryModule {}
