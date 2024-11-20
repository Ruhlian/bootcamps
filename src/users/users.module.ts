import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';
@Module({
  imports: [ TypeOrmModule.forFeature([User, Bootcamp]) ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
