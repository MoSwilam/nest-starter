
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Comment {
    id: string;
    comment: string;
}

export class Idea {
    id: string;
    idea: string;
    comments?: Comment[];
    description: string;
    author?: User;
    upvotes?: number;
    downvotes?: number;
    createdAt: string;
    updatedAt: string;
}

export abstract class IQuery {
    abstract ideas(page?: number, newest?: boolean): Idea[] | Promise<Idea[]>;

    abstract users(page?: number): User[] | Promise<User[]>;

    abstract user(email?: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export class User {
    id: string;
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

export abstract class IMutation {
    abstract login(email: string, password: string): Auth | Promise<Auth>;

    abstract register(email: string, password: string): Auth | Promise<Auth>;
}
