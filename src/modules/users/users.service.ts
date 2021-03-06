import { Injectable, BadRequestException, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserRO } from './user.dto';
import { IdeaEntity } from '../ideas/idea.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(IdeaEntity)
        private ideaRepo: Repository<IdeaEntity>
    ) {}

    async showAll(page: number = 1): Promise<UserRO[]> {
        const users = await this.userRepo.find({
            relations: ['ideas', 'bookmarks'],
            take: 25,
            skip: 25 * (page - 1)
        });
        return users.map(user => user.toResponseObject(false));
    }

    async read(email: string) {
        const user = await this.userRepo.findOne({where: {email}, relations: ['ideas', 'bookmarks']});
        if (!user) throw new NotFoundException();
        return user.toResponseObject();
    }

    async getById(userId: number): Promise<Partial<UserRO>> {
        const user = await this.userRepo.findOne({where: {id: userId}, relations:['ideas', 'bookmarks']});
        if (!user) throw new NotFoundException();
        return user.toResponseObject();
    }

    async login(data): Promise<UserRO> {
        const { email, password } = data;
        const user = await this.userRepo.findOne({where: { email }});
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid email or password!', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(true);
    }

    async register(data: UserDTO) {
        const {email} = data;
        let user = await this.userRepo.findOne({where: { email }});
        if (user) {
            throw new HttpException('User already exists!', HttpStatus.CONFLICT);
        }
        user = await this.userRepo.create(data);
        await this.userRepo.save(user);

        return user.toResponseObject(true);
    }
}
