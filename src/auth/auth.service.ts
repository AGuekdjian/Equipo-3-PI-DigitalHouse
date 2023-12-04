import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginAuthDto } from './dto/index';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, ...userData } = createAuthDto;
      const newUser = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(newUser);
      const { password: passwordnew, last_modified_date, created_date, id, isActive, ...user } = newUser
      return {
        user: user,
        token: this.getJwtToken({ id: newUser.id })
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async createRootUser(createAuthDto: CreateAuthDto) {
    try {
      const existRootUser = await this.userRepository.findOne({
        where: { role: "ROLE_ROOT" }
      });
      if (existRootUser) throw new BadRequestException('Root user already exists');
      const { password, ...userData } = createAuthDto;
      const newUser = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        role: "ROLE_ROOT"
      });
      await this.userRepository.save(newUser);
      const { password: passwordnew, last_modified_date, created_date, id, isActive, ...user } = newUser
      return {
        user: user,
        token: this.getJwtToken({ id: newUser.id })
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async login(LoginAuthDto: LoginAuthDto) {
    const { email, password } = LoginAuthDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true, name: true, last_name: true, role: true }
    });
    if (!user)
      throw new UnauthorizedException('Invalid credentials');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');
    delete user.password;
    return {
      user: user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return {
        token: this.getJwtToken({ id: payload.id })
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async promoteToAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');
    if (user.role === "ROLE_USER") {
      await this.userRepository.update(id, { role: "ROLE_ADMIN" });
      return { ok: true, message: "User promoted to admin" }
    }
    if (user.role === "ROLE_ADMIN") {
      await this.userRepository.update(id, { role: "ROLE_USER" });
      return { ok: true, message: "User demoted to user"}
    };
  }

  async inactive(id: string, userRoot: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('User not found');
    if (user.role === "ROLE_ROOT") throw new BadRequestException('You cannot inactive root user');
    if (id === userRoot) throw new BadRequestException('You cannot inactive your user');
    if (user.isActive) {
      await this.userRepository.update(id, { isActive: false });
      return { ok: true, message: "User inactive" }
    }
    if (!user.isActive) {
      await this.userRepository.update(id, { isActive: true });
      return { ok: true, message: "User active" }
    };
  }

  async listUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }

  private handleErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('User already exists');
    }
    console.log(error);
    throw new BadRequestException(error.message);
  }

}
