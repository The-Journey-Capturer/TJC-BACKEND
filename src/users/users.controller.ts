import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.usersService.login(dto); // 🟢 verify user
    return this.authService.login(user);             // 🟢 return token
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.usersService.getMe(req.user.id);
  }

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/role')
  updateUserRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.usersService.updateUser(id, dto);
  }


  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
