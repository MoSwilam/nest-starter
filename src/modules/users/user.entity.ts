import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IsJWT } from 'class-validator';

import { UserResponseObject } from './user.dto';
import { Logger } from '@nestjs/common';
import { password } from 'src/common/validationSchemas/common.validation.schemas';

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

    @CreateDateColumn()
    createdAt: Date;
    

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    toResponseObject(showToken: boolean = true): UserResponseObject {
        const { id, username, createdAt, token } = this;
        const responseOject: UserResponseObject = { id, username, createdAt };
        if (showToken) {
            responseOject.token = token;
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