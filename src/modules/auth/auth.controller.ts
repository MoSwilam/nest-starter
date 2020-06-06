import { Controller,
   Get,
   Post,
   Body,
   UseFilters,
   ForbiddenException,
   BadRequestException,
   Param,
   UsePipes
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { IAuth } from './interface/auth.interface';
import { HttpExceptionFilter } from '../../common/exception-filter/http.exception.filter';
import { ParseIntPipe } from '../../common/pipes/parseInt.pipe';
// import { JoiValidationPipe } from './../../common/joi/joi.validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  // @UsePipes(new JoiValidationPipe(LoginDto))
  login(@Body() login: LoginDto) {
    return this.authService.login(login)
  }

  @Get()
  //@UseFilters(HttpExceptionFilter)
  findAll(): string {
    return 'list of lists'
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.authService.findOne(id)
  }
}