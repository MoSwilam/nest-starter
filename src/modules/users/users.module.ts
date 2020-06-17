import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { IdeaEntity } from '../idea/idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
