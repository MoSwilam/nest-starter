// import { IsString } from 'class-validator';
import { UserRO } from '../users/user.dto';

export class IdeaDTO {
    idea: string;
    description: string;
}

export class IdeaRO {
    id?: number;
    idea: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    author: UserRO;
    upvotes: number;
    downvotes: number;
}