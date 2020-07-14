import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, UseGuards, Logger, Options } from '@nestjs/common';
// import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { addIdeaSchema } from './schema/idea.schema';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserDec } from '../users/user.decorator';

@Controller('ideas')
export class IdeaController {
    constructor(private ideaService: IdeaService) {}

    @Get()
    async showAllIdeas(){
        return await this.ideaService.showAllIdeas();
    }

    @Post()
    @UseGuards(new AuthGuard())
    //@UsePipes(new JoiValidationPipe(addIdeaSchema))
    async createIdea(@UserDec('id') userId, @Body() data: IdeaDTO){
        return await this.ideaService.create(userId, data);
    }

    @Get(':id')
    async getById(@Param('id') id: number){
        return await this.ideaService.getById(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    async updateIdea(@Param('id') id: number, @UserDec('id') user, @Body() data: Partial<IdeaDTO>) {
        return await this.ideaService.update(id,user, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    async deleteIdea(@Param('id') id: number, @UserDec('id') user: number) {
        return await this.ideaService.delete(id, user);
    }

    @Post(':id/upvote')
    @UseGuards(new AuthGuard())
    async upvote(@Param('id') id: number, @UserDec('id') userId: number) {
        return this.ideaService.upvote(id, userId);
    }

    @Post(':id/downvote')
    @UseGuards(new AuthGuard())
    async downvote(@Param('id') id: number, @UserDec('id') userId: number) {
        return this.ideaService.downvote(id, userId);
    }

    @Post(':id/bookmark')
    @UseGuards(new AuthGuard())
    async bookmarkIdea(@Param('id') id: number, @UserDec('id') userId: number) {
        return this.ideaService.bookmarkIdea(id, userId);
    }

    @Delete(':id/bookmark')
    @UseGuards(new AuthGuard())
    async unbookmarkIdea(@Param('id') id: number, @UserDec('id') userId: number) {
        return this.ideaService.unbookmarkIdea(id, userId);
    }
}
