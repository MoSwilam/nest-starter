
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Comment {
    id: string;
    comment: string;
    author?: User;
}

export abstract class IQuery {
    abstract comment(id: string): Comment | Promise<Comment>;

    abstract ideas(page?: number, newest?: boolean): Idea[] | Promise<Idea[]>;

    abstract idea(id: string): Idea | Promise<Idea>;

    abstract users(page?: number): User[] | Promise<User[]>;

    abstract user(email?: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createComment(idea: string, comment?: string): Comment | Promise<Comment>;

    abstract deleteComment(comment: string): Comment | Promise<Comment>;

    abstract createIdea(idea: string, description: string): Idea | Promise<Idea>;

    abstract updateIdea(id: string, idea?: string, description?: string): Idea | Promise<Idea>;

    abstract deleteIdea(id: string): Idea | Promise<Idea>;

    abstract upvote(id: string): Idea | Promise<Idea>;

    abstract downvote(id: string): Idea | Promise<Idea>;

    abstract bookmark(id: string): User | Promise<User>;

    abstract unbookmark(id: string): User | Promise<User>;

    abstract login(email: string, password: string): Auth | Promise<Auth>;

    abstract register(email: string, password: string): Auth | Promise<Auth>;
}

export class Idea {
    id?: string;
    idea: string;
    comments?: Comment[];
    description: string;
    author?: User;
    upvotes?: number;
    downvotes?: number;
    createdAt: string;
    updatedAt: string;
}

export class User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    isEmailVerified?: boolean;
    isBlocked?: boolean;
    ideas?: Idea[];
    bookmarks?: Idea[];
    comments?: Comment[];
}

export class Auth {
    email: string;
    token: string;
}
