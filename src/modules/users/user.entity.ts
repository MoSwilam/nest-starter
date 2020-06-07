import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IsJWT } from 'class-validator';

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

    toResponseObject(showToken: boolean = true) {
        const { id, username, createdAt, token } = this;
        if (showToken) {
            return { id, token };
        }
        return { id, username, createdAt };
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