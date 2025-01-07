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

    // sign jwt
    const { accessToken, accessTokenExpiresIn } = await this.signAccessToken({
      sub: user.id,
      email: user.email,
    });
    const refreshToken = await this.signRefreshToken({
      sub: user.id,
      email: user.email,
    });
    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      userId: user.id,
      username: user.username,
      // TODO: will be url to user's public image
      profileImage: '',
    };
  }

  async signup(signupDto: SignupDto) {
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

    signupDto.password = hashedPassword;

    // create user in db
    const newUser = await this.usersService.createUser(signupDto);

    // sign jwt
    const { accessToken, accessTokenExpiresIn } = await this.signAccessToken({
      sub: newUser.id,
      email: newUser.email,
    });
    const refreshToken = await this.signRefreshToken({
      sub: newUser.id,
      email: newUser.email,
    });

    return {
      user: newUser,
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
    };
  }

  async signRefreshToken(payload: { sub: string; email: string }) {
    return await this.jwtService.signAsync(payload, { expiresIn: '2d' });
  }

  async signAccessToken(payload: { sub: string; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const decoded = await this.jwtService.decode(accessToken);

    const accessTokenExpiresIn = new Date(
      decoded.exp * 1000, // convert to milliseconds
    ).toISOString();

    return {
      accessToken,
      accessTokenExpiresIn,
    };
  }

  async getCurrentUser(id: string) {
    const user = await this.usersService.getUserById(id);
    delete user.password;
    return user;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // make sure refreshToken is still valid.
      const decoded = await this.jwtService.verify(refreshToken);

      // sign a new access token if refresh token is still valid.
      const { accessToken, accessTokenExpiresIn } = await this.signAccessToken({
        sub: decoded.sub,
        email: decoded.email,
      });

      return {
        userId: decoded.sub,
        accessToken,
        accessTokenExpiresIn,
        refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refreshtoken');
    }
  }
}
