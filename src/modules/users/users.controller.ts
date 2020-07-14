import { Controller, Post, Get, Body, UsePipes, UseGuards, Param, ParseIntPipe } from '@nestjs/common';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { UsersService } from './users.service';
import { UserDTO, UserRO } from './user.dto';
import { UserSchema } from './user.schema';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserDec } from './user.decorator';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('')
    // @UseGuards(new AuthGuard())
    async showAllUsers() {
        return await this.userService.showAll();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    async getById(@Param('id', ParseIntPipe) id) {
        return await this.userService.getById(id);
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(UserSchema))
    async login(@Body() body: Partial<UserDTO>) {
        return await this.userService.login(body);
    }

    @Post('register')
    @UsePipes(new JoiValidationPipe(UserSchema))
    async register(@Body() body: Partial<UserDTO>) {
        return await this.userService.register(body);
    }
}
