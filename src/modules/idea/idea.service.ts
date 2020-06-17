import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class IdeaService {
    constructor(
            @InjectRepository(IdeaEntity) 
            private ideaRepositry: Repository<IdeaEntity>,

            @InjectRepository(UserEntity)
            private userRepository: Repository<UserEntity>
        ) {}

    private toResponseObject(idea: IdeaEntity): IdeaRO {
        return { ...idea, author: idea.author.toResponseObject(false) };
    }

    private ensureOwnershit(idea: IdeaEntity, userId: number) {
        if (idea.author.id !== userId) {
            throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
        }
    }

    async showAllIdeas(): Promise<IdeaRO[]> {
        const ideas = await this.ideaRepositry.find({ relations: ['author'] });
        return ideas.map(idea => this.toResponseObject(idea));
    }

    async create(userId: number, data: IdeaDTO): Promise<IdeaRO> {
        const user = await this.userRepository.findOne({where:{ id: userId }});
        const idea = this.ideaRepositry.create({ ...data, author: user });
        await this.ideaRepositry.save(idea);
        return this.toResponseObject(idea);
    }

    async getById(id: number): Promise<IdeaRO> {
        const idea = await this.ideaRepositry.findOne({where: { id }, relations: ['author']})
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.toResponseObject(idea);
    }

    async update(id: number, userId: number, data: Partial<IdeaDTO>): Promise<IdeaRO> {
        let idea = await this.ideaRepositry.findOne({where: { id }, relations: ['author']});
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.ensureOwnershit(idea, userId);
        await this.ideaRepositry.update({id}, data);
        idea = await this.ideaRepositry.findOne({where: { id }, relations: ['author']});
        return this.toResponseObject(idea);
    }

    async delete(id: number, userId: number): Promise<IdeaEntity> {
        const idea = await this.ideaRepositry.findOne({where: { id }, relations: ['author']});
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.ensureOwnershit(idea, userId);
        await this.ideaRepositry.delete({id})
        return idea;
    }
}
