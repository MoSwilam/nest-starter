import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
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
    login(@Body() body: UserDTO) {
        this.userService.login(body);
    }

    @Post('register')
    register(@Body() body: UserDTO) {
        return this.userService.register(body);
    }
}
