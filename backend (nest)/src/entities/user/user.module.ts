import { Module } from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm"
import { User } from './user.entity';
import { UserController } from '@entities/user/user.controller';
import { UserService } from '@entities/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@services/auth/auth.module';
import { MinioService } from '../../minio/minio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule,
    AuthModule
  ],
  controllers: [ UserController ],
  providers: [ UserService, MinioService ]
})
export class UserModule {}
