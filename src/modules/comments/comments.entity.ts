import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { IdeaEntity } from "../idea/idea.entity";

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => UserEntity)
  // we are adding this to not have to add the add the inverse relationship,,,, this will create a join table
  @JoinTable()
  author: UserEntity

  @ManyToOne(type => IdeaEntity, idea => idea.comments)
  idea: IdeaEntity
}