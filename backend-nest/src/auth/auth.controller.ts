import { Controller, Get, Post, Body, UseGuards, Req, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto, LoginAuthDto } from './dto/index';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('createRootUser')
  createRootUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createRootUser(createAuthDto);
  }

  @Post('refreshToken')
  refreshToken(@Body() body: any) {
    return this.authService.refreshToken(body.token);
  }

  @Post('promoteToAdmin/:id')
  @UseGuards(AuthGuard())
  promoteToAdmin(@GetUser() user: User, @Param('id') id: string) {
    if (user.role !== 'ROLE_ROOT') throw new UnauthorizedException('You are not authorized to perform this action');
    return this.authService.promoteToAdmin(id);
  }

  @Post('inactive/:id')
  @UseGuards(AuthGuard())
  inactive(@GetUser() user: User, @Param('id') id: string) {
    if (user.role !== 'ROLE_ROOT') throw new UnauthorizedException('You are not authorized to perform this action');
    return this.authService.inactive(id,user.id);
  }

  @Get('users')
  @UseGuards(AuthGuard())
  listUsers(@GetUser() user: User) {
    if (user.role !== 'ROLE_ROOT') throw new UnauthorizedException('You are not authorized to perform this action');
    return this.authService.listUsers();
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User
  ) {
    console.log({ user });
    return {
      ok: true,
      message: 'This is a private route'
    }
  }
}