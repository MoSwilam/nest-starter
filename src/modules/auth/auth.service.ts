import { Injectable } from '@nestjs/common';
import { IAuth } from './interface/auth.interface';
import { LoginDto } from './dto/login.dto';

Injectable()
export class AuthService {
    private readonly auths: LoginDto[] = [];

    login(auth: LoginDto) {
        this.auths.push(auth);
        return this.getAll()
    }

    getAll(): LoginDto[] {
        return this.auths;
    }

    findOne(id) {
        return `here is cat with id ${id}`
    }
}