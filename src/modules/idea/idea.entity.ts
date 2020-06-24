import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { type } from 'os';


@Entity('idea')
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
} 