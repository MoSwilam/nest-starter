import { IsString } from 'class-validator';
import { IdeaEntity } from '../idea/idea.entity';

export class UserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class UserRO {
    id: number;
    username: string;
    createdAt: Date;
    token?: string;
    ideas?: IdeaEntity[];
    bookmarks?: IdeaEntity[];
}