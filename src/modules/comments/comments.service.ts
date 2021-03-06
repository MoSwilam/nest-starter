import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./comments.entity";
import { Repository } from "typeorm";
import { IdeaEntity } from "../ideas/idea.entity";
import { UserEntity } from "../users/user.entity";
import { CommentDTO } from "./comments.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity) 
    private commentsRepo: Repository<CommentEntity>,

    @InjectRepository(IdeaEntity)
    private ideasRepo: Repository<IdeaEntity>,

    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>
  ) {}

  private toResponseObject(comment: CommentEntity) {
    const responseObject: CommentDTO = comment;
    if (comment.author) {
      responseObject.author = comment.author.toResponseObject();
    }
    return responseObject;
  }

  async showComment(id: number) {
    const comment = await this.commentsRepo.findOne({
      where: {id}, relations: ['author', 'idea']
    });
    if (!comment) throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
    return this.toResponseObject(comment);
  }

  async showByIdea(ideaId: number, page: number = 1) {
    const comments = await this.commentsRepo.find({
      where: {idea: { id: ideaId }},
      relations: ['author'],
      take: 25,
      skip: 25 * (page - 1)
    });
    if (!comments) throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
    return comments.map(comment => this.toResponseObject(comment));
  }

  async showByUser(userId: number, page: number = 1) {
    const comments = await this.commentsRepo.find({
      where: { author: { id: userId } },
      relations: ['author'],
      take: 25,
      skip: 25 * (page - 1)
    })

    return comments.map(comment => this.toResponseObject(comment));
  }

  async create(ideaId: number, userId: number, data: CommentDTO) {
    const idea = await this.ideasRepo.findOne({where: {id: ideaId}});
    const user = await this.usersRepo.findOne({where: {id: userId}});

    const comment = await this.commentsRepo.create({
      ...data,
      idea,
      author: user
    });

    await this.commentsRepo.save(comment);
    return this.toResponseObject(comment);
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentsRepo.findOne({
      where: {id: commentId},
      relations: ['author', 'idea']
    });

    if (!comment.author || comment.author.id !== userId || !comment.id) {
      throw new HttpException('you do not own this comment to delete it', HttpStatus.UNAUTHORIZED);
    }
    await this.commentsRepo.delete(comment);
    return this.toResponseObject(comment);
  }
}