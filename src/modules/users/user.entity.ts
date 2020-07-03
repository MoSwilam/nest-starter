import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IsJWT } from 'class-validator';

import { UserRO } from './user.dto';
import { Logger } from '@nestjs/common';
import { password } from 'src/common/validationSchemas/common.validation.schemas';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;


    @Column()
    password: string;

    @OneToMany(type => IdeaEntity, idea => idea.author)
    ideas: IdeaEntity[];

    @ManyToMany(type => IdeaEntity, { cascade: true })
    @JoinTable()
    bookmarks: IdeaEntity[];

    @CreateDateColumn()
    createdAt: Date;
    

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    toResponseObject(showToken: boolean = false): UserRO {
        const { id, username, createdAt, token } = this;
        const responseOject: UserRO = { id, username, createdAt };
        if (showToken) {
            responseOject.token = token;
        }
        if (this.ideas) {
            responseOject.ideas = this.ideas;
        }

        if (this.bookmarks) {
            responseOject.bookmarks = this.bookmarks;
        }
        return responseOject;
    }

    async comparePassword(attempted: string) {
        return await bcrypt.compare(attempted, this.password);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign(
            {
                id,
                username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
    }
}