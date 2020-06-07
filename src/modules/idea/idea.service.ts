import { Injectable } from '@nestjs/common';
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
        return await this.ideaRepositry.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<IdeaDTO>) {
        await this.ideaRepositry.update({id}, data);
        return await this.ideaRepositry.findOne({ where: { id } });
    }

    async delete(id: number) {
        await this.ideaRepositry.delete({id})
        return { deleted: true }
    }
}
