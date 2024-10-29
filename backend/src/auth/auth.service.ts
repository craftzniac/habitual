import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    // check if user exists in db
    const user = await this.usersService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    // compare password with hash
    const isMatches = await bcrypt.compare(loginDto.password, user.password);
    if (isMatches === false) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    const payload = { sub: user.id, email: user.email };
    // sign jwt
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, userId: user.id };
  }

  async signup(signupDto: SignupDto) {
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

    signupDto.password = hashedPassword;

    // create user in db
    const newUser = await this.usersService.createUser(signupDto);
    const payload = { sub: newUser.id, email: newUser.email };

    // sign jwt
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: newUser,
      accessToken,
    };
  }

  async getCurrentUser(id: string) {
    const user = await this.usersService.getUserById(id);
    delete user.password;
    return user;
  }
}
