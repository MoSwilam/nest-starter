import { IsString } from 'class-validator';

export class UserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UserResponseObject {
    id: number;
    username: string;
    createdAt: Date;
    token?: string;
}