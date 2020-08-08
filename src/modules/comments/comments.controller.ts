import { Controller, Get, Param, Post, UseGuards, UsePipes, Body, Delete } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { JoiValidationPipe } from "src/common/pipes/joi.validation.pipe";

import { postComment } from './schemas/comments.schema';
import { UserDec } from "../../common/user.decorator";
import { CommentDTO } from "./comments.dto";

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get('ideas/:id')
  showCommentsByIdea(@Param('id') ideaId: number) {
    return this.commentService.showByIdea(ideaId);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') userId: number) {
    return this.commentService.showByUser(userId);
  }

  @Post('ideas/:id')
  @UseGuards(new AuthGuard())
  //@UsePipes(new JoiValidationPipe(postComment))
  async postComment(@Param('id') ideaId: number, @UserDec('id') userId: number, @Body() data: CommentDTO) {
    return await this.commentService.create(ideaId, userId, data)
  }

  @Get('id')
  showComment(@Param('id') id: number) {
    return this.commentService.showComment(id);
  }

  @Delete('id')
  @UseGuards(new AuthGuard())
  deleteComment(@Param('id') commentId: number, @UserDec('id') userId: number) {
    return this.commentService.deleteComment(commentId, userId);
  }
}