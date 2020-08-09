import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from '../users/user.entity';
import { Votes } from './ideaVote.enum';
import { take } from 'rxjs/operators';

@Injectable()
export class IdeaService {
    constructor(
            @InjectRepository(IdeaEntity) 
            private ideaRepository: Repository<IdeaEntity>,

            @InjectRepository(UserEntity)
            private userRepository: Repository<UserEntity>
        ) {}

    private toResponseObject(idea: IdeaEntity): IdeaRO {
        // todo: fix the any type here
        const responseObject: any = { ...idea, author: idea.author.toResponseObject(false) };
        if (responseObject.upvotes) {
            responseObject.upvotes = idea.upvotes.length;
        }

        if (responseObject.downvotes) {
            responseObject.downvotes = idea.downvotes.length;
        }
        return responseObject;
    }

    private ensureOwnershit(idea: IdeaEntity, userId: number) {
        if (idea.author.id !== userId) {
            throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
        }
    }

    private async vote(idea: IdeaEntity, user: UserEntity, vote: Votes) {
        const oppositeVote = vote === Votes.UP ? Votes.DOWN : Votes.UP;

        const voted = idea[vote].some(voter => voter.id === user.id);
        const votedOpposite = idea[oppositeVote].some(voter => voter.id === user.id);
     
        if (voted || votedOpposite) {
                // remove the user from the relevant vote array
                idea[vote] = idea[vote].filter(voter => voter.id !== user.id); 
                idea[oppositeVote] = idea[oppositeVote].filter(voter => voter.id !== user.id);
                await this.ideaRepository.save(idea);
        } else if (!voted) {
            idea[vote].push(user);
            await this.ideaRepository.save(idea);
        } else {
            throw new HttpException('Unable to cast vote', HttpStatus.BAD_REQUEST);
        }
        return idea;
    }

    async showAll(page: number = 1, newest?: boolean): Promise<IdeaRO[]> {
        const ideas = await this.ideaRepository.find({
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
            take: 25,
            skip: 25 * (page - 1),
            order: newest && { createdAt: 'DESC' }
          });
        return ideas.map(idea => this.toResponseObject(idea));
    }

    async create(userId: number, data: IdeaDTO): Promise<IdeaRO> {
        const user = await this.userRepository.findOne({where:{ id: userId }});
        const idea = this.ideaRepository.create({ ...data, author: user });
        await this.ideaRepository.save(idea);
        return this.toResponseObject(idea);
    }

    async getById(id: number): Promise<IdeaRO> {
        const idea = await this.ideaRepository.findOne({where: { id }, relations: ['author', 'upvotes', 'downvotes', 'comments']})
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.toResponseObject(idea);
    }

    async update(id: number, userId: number, data: Partial<IdeaDTO>): Promise<IdeaRO> {
        let idea = await this.ideaRepository.findOne({where: { id }, relations: ['author']});
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.ensureOwnershit(idea, userId);
        await this.ideaRepository.update({id}, data);
        idea = await this.ideaRepository.findOne({where: { id }, relations: ['author', 'comments']});
        return this.toResponseObject(idea);
    }

    async delete(id: number, userId: number): Promise<IdeaEntity> {
        const idea = await this.ideaRepository.findOne({where: { id }, relations: ['author', 'comments']});
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        this.ensureOwnershit(idea, userId);
        await this.ideaRepository.delete({id})
        return idea;
    }

    async bookmarkIdea(id: number, userId: number) {
        const idea = await this.ideaRepository.findOne({where: { id }});
        if(!idea) throw new HttpException('Idea doesn\'t exist', HttpStatus.NOT_FOUND);

        const user = await this.userRepository.findOne({where: { id: userId }, relations: ['bookmarks']});

        // close look needed for clearance
        const userBookmarks = user.bookmarks.filter(bookmark => bookmark.id === idea.id);
        if (userBookmarks.length < 1) {
            user.bookmarks.push(idea);
            await this.userRepository.save(user);
        } else {
            throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject(false);
    }

    async unbookmarkIdea(id: number, userId: number) {
        const idea = await this.ideaRepository.findOne({where: { id }});
        if(!idea) throw new HttpException('Idea doesn\'t exist', HttpStatus.NOT_FOUND);

        const user = await this.userRepository.findOne({where: { id: userId }, relations: ['bookmarks']});

        if (user.bookmarks.filter(bookmark => bookmark.id !== idea.id).length > 0) {
            user.bookmarks = user.bookmarks.filter(bookmark => bookmark.id !== idea.id);
            await this.userRepository.save(user);
        } else {
            throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(false);
    }

    async upvote(id: number, userId: number) {
        let idea = await this.ideaRepository.findOne({where: { id }, relations: ['author', 'upvotes', 'downvotes', 'comments']});
        if(!idea) throw new HttpException('Idea doesn\'t exist', HttpStatus.NOT_FOUND);
        const user = await this.userRepository.findOne({where: {id: userId}})

        idea = await this.vote(idea, user, Votes.UP);
        return this.toResponseObject(idea);
    }

    async downvote(id: number, userId: number) {
        let idea = await this.ideaRepository.findOne({where: { id }, relations: ['author', 'upvotes', 'downvotes', 'comments']});
        if(!idea) throw new HttpException('Idea doesn\'t exist', HttpStatus.NOT_FOUND);
        const user = await this.userRepository.findOne({where: {id: userId}})

        idea = await this.vote(idea, user, Votes.DOWN);
        return this.toResponseObject(idea);
    }
}
