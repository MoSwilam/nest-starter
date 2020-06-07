import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { addIdeaSchema } from './schema/idea.schema';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('idea')
export class IdeaController {
    constructor(private ideaService: IdeaService) {}

    @Get()
    async showAllIdeas(){
        return await this.ideaService.showAllIdeas();
    }

    @Post()
    @UsePipes(new JoiValidationPipe(addIdeaSchema))
    async createIdea(@Body() data: IdeaDTO){
        return await this.ideaService.create(data);
    }

    @Get(':id')
    async getById(@Param('id') id: number){
        return await this.ideaService.read(id);
    }

    @Put(':id')
    async updateIdea(@Param('id') id: number, @Body() data: Partial<IdeaDTO>) {
        return await this.ideaService.update(id, data);
    }

    @Delete(':id')
    async deleteIdea(@Param('id') id: number) {
        return await this.ideaService.delete(id)
    }
}
