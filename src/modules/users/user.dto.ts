import { IdeaEntity } from '../idea/idea.entity';

export class UserDTO {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    isEmailVerified?: boolean;
    isBlocked?: boolean;
    username?: string;
    password?: string;
    token?: string;
    ideas?: IdeaEntity[];
    bookmarks?: IdeaEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserRO {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    isEmailVerified?: boolean;
    isBlocked?: boolean;
    username?: string;
    password?: string;
    token?: string;
    ideas?: IdeaEntity[];
    bookmarks?: IdeaEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}