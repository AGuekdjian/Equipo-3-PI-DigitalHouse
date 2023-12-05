import { Inject, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { use } from 'passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStategy } from './stategies/jwt.startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    },)],
  exports: [TypeOrmModule, JwtStategy, PassportModule, JwtModule]
})
export class AuthModule { }
