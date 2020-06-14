import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { UsersService } from './users.service';
import { UserDTO, UserResponseObject } from './user.dto';
import { postUser } from './schema/user.schema';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('')
    async showAllUsers() {
        return await this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(postUser))
    async login(@Body() body: UserDTO) {
        return await this.userService.login(body);
    }

    @Post('register')
    @UsePipes(new JoiValidationPipe(postUser))
    async register(@Body() body: UserDTO) {
        return await this.userService.register(body);
    }
}
