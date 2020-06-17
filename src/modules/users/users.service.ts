import { Injectable, BadRequestException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserRO } from './user.dto';
import { IdeaEntity } from '../idea/idea.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(IdeaEntity)
        private ideaRepo: Repository<IdeaEntity>
    ) {}

    async showAll(): Promise<UserRO[]> {
        const users = await this.userRepo.find({ relations: ['ideas'] });
        return users.map(user => user.toResponseObject(false));
    }

    async login(data): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepo.findOne({where: { username }});
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username or pasword', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO) {
        const {username} = data;
        let user = await this.userRepo.findOne({where: { username }});
        if (user) {
            throw new HttpException('User already exists!', HttpStatus.CONFLICT);
        }
        user = await this.userRepo.create(data);
        await this.userRepo.save(user);
        return user.toResponseObject();
    }
}
