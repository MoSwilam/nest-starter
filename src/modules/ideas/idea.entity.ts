import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CommentEntity } from '../comments/comments.entity';


@Entity('ideas')
export class IdeaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    idea: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column('text')
    description: string;

    @ManyToOne(type => UserEntity, author => author.ideas)
    author: UserEntity;

    @ManyToMany(type => UserEntity, { cascade: true })
    @JoinTable()
    upvotes: UserEntity[];

    @ManyToMany(type => UserEntity, { cascade: true })
    @JoinTable()
    downvotes: UserEntity[];

    @OneToMany(type => CommentEntity, comment => comment.idea, { cascade: true })
    comments: CommentEntity[]
}