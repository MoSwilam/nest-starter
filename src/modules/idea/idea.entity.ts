import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';


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
} 