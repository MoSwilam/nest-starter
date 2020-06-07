import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    async showAll() {
        const users = await this.userRepo.find();
        console.log(users)
        return users.map(user => user.toResponseObject())
    }

    async login(data) {
        const { username, passwprd } = data;
        const user = await this.userRepo.findOne({where: { username }});
        if (!user || (await user.comparePassword(passwprd))) {
            throw new HttpException('Invalid username or pasword', HttpStatus.BAD_REQUEST);
        }
    }

    async register(data) {
        const {username} = data;
        let user = await this.userRepo.findOne({where: { username }});
        if (user) {
            throw new HttpException('User already exists!', HttpStatus.CONFLICT);
        }
        return await this.userRepo.create(data);
        // await this.userRepo.save(user);
        // return user.toResponseObject();
    }
}
