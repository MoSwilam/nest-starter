import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserRO } from './user.dto';
import { Logger } from '@nestjs/common';
import { password } from 'src/common/validationSchemas/common.validation.schemas';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: true
    })
    email: string;

    @Column({default: false})
    isEmailVerified: boolean;

    @Column({default: false})
    isBlocked: boolean;

    @Column()
    password: string;

    @OneToMany(type => IdeaEntity, idea => idea.author)
    ideas: IdeaEntity[];

    @ManyToMany(type => IdeaEntity, { cascade: true })
    @JoinTable()
    bookmarks: IdeaEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    toResponseObject(showToken: boolean = false): UserRO {
        const { id,
            email,
            firstName,
            lastName,
            createdAt,
            token,
            isEmailVerified,
            isBlocked,
            updatedAt
        } = this;

        const responseObject: UserRO = {
            id,
            email,
            firstName,
            lastName,
            isEmailVerified,
            isBlocked,
            createdAt,
            updatedAt
        };
        if (showToken) {
            return {id, token}
        }
        if (this.ideas) {
            responseObject.ideas = this.ideas;
        }

        if (this.bookmarks) {
            responseObject.bookmarks = this.bookmarks;
        }
        return responseObject;
    }

    async comparePassword(attempted: string) {
        return await bcrypt.compare(attempted, this.password);
    }

    private get token() {
        const { id, email } = this;
        return jwt.sign(
            {
                id,
                email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
    }
}