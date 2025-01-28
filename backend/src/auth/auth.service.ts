import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountsService } from 'src/user-accounts/user-accounts.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { HabitDaysService } from 'src/habit-days/habit-days.service';

@Injectable()
export class AuthService {
  constructor(
    private userAccountsService: UserAccountsService,
    private jwtService: JwtService,
    private habitDaysService: HabitDaysService,
  ) {}

  async login(loginDto: LoginDto) {
    // check if userAccount exists in db
    const userAccount = await this.userAccountsService.getUserAccountByEmail(
      loginDto.email,
    );
    if (!userAccount) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    // compare password with hash
    const isMatches = await bcrypt.compare(
      loginDto.password,
      userAccount.password,
    );
    if (isMatches === false) {
      throw new UnauthorizedException('Email or Password is invalid');
    }

    // sign jwt
    const { accessToken, accessTokenExpiresIn } = await this.signAccessToken({
      sub: userAccount.id,
      email: userAccount.email,
    });
    const refreshToken = await this.signRefreshToken({
      sub: userAccount.id,
      email: userAccount.email,
    });
    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      userAccountId: userAccount.id,
      email: userAccount.email,
      username: userAccount.username,
      // TODO: will be url to userAccount's public profile image
      profileImage: userAccount.profileImage || '',
    };
  }

  async signup(signupDto: SignupDto) {
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

    signupDto.password = hashedPassword;

    // create userAccount in db
    const newuserAccount =
      await this.userAccountsService.createUserAccount(signupDto);

    // sign jwt
    const { accessToken, accessTokenExpiresIn } = await this.signAccessToken({
      sub: newuserAccount.id,
      email: newuserAccount.email,
    });
    const refreshToken = await this.signRefreshToken({
      sub: newuserAccount.id,
      email: newuserAccount.email,
    });

    return {
      userAccount: newuserAccount,
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

  async getCurrentUserAccount(id: string) {
    const userAccount = await this.userAccountsService.getUserAccountById(id);
    delete userAccount.password;
    return userAccount;
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
        userAccountId: decoded.sub,
        accessToken,
        accessTokenExpiresIn,
        refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refreshtoken');
    }
  }

  async deleteAccount(userAccountId: string): Promise<{ success: boolean }> {
    const userAccount =
      await this.userAccountsService.getUserAccountById(userAccountId);
    if (!userAccount) {
      return { success: true };
    }
    await this.habitDaysService.deleteAllForUserAccount(userAccountId);
    await this.userAccountsService.deleteUserAccount(userAccountId);
    return null;
  }

  async updateUsername(userAccountId: string, username: string) {
    return await this.userAccountsService.updateUsername(
      userAccountId,
      username,
    );
  }
}
