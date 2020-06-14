import { Controller, Post, Get, Body, UsePipes, UseGuards } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { UsersService } from './users.service';
import { UserDTO, UserResponseObject } from './user.dto';
import { postUser } from './schema/user.schema';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserDec } from './user.decorator';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('')
    @UseGuards(new AuthGuard())
    async showAllUsers(@UserDec() user) {
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
