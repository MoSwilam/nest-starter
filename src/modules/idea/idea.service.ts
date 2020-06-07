import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(
            @InjectRepository(IdeaEntity) 
            private ideaRepositry: Repository<IdeaEntity>
        ) {}

    async showAllIdeas() {
        return await this.ideaRepositry.find();
    }

    async create(data: IdeaDTO) {
        const idea = this.ideaRepositry.create(data);
        await this.ideaRepositry.save(idea);
        return idea;
    }

    async read(id: number) {
        return await this.getById(id);
    }

    async update(id: number, data: Partial<IdeaDTO>) {
        const idea = await this.getById(id);
        await this.ideaRepositry.update({id}, data);
        return idea;
    }

    async delete(id: number) {
        const idea = this.getById(id);
        await this.ideaRepositry.delete({id})
        return idea;
    }

    async getById(id: number): Promise<IdeaDTO> {
        const idea = await this.ideaRepositry.findOne({ where: { id } });
        if (!idea) throw new HttpException('Not Found!', HttpStatus.NOT_FOUND);
        return idea;
    }
}
