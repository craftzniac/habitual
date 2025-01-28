import {
  BadRequestException,
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { UserAccount } from './entity/user-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccount)
    private userAccountsRepository: Repository<UserAccount>,
  ) {}

  /**
   * finds the user with the matching email address
   */
  async getUserAccountByEmail(email: string): Promise<UserAccount> {
    const userAccount = await this.userAccountsRepository.findOneBy({ email });
    if (!userAccount) {
      return null;
    }
    delete userAccount.deletedAt;
    return userAccount;
  }

  async getUserAccountById(id: string): Promise<UserAccount | null> {
    const userAccount = await this.userAccountsRepository.findOneBy({ id });
    if (!userAccount) {
      return null;
    }
    delete userAccount.deletedAt;
    return userAccount;
  }

  /**
   * create a new user in the database
   * */
  async createUserAccount(newUser: SignupDto): Promise<UserAccount> {
    try {
      const userEntity = this.userAccountsRepository.create({
        ...newUser,
      });
      const insertResult = await this.userAccountsRepository.insert(userEntity);
      const newUserId = insertResult.identifiers[0].id;

      // get newly created user account
      const userAccount = await this.userAccountsRepository.findOneBy({
        id: newUserId,
      });

      delete userAccount.password;
      delete userAccount.deletedAt;

      return userAccount;
    } catch (err) {
      if (err instanceof QueryFailedError) {
        let message = 'An account with this email already exists';
        type DriverError = { code: string; detail: string };
        const error = err.driverError as DriverError;
        if (error.code === '23505') {
          if (error.detail.includes('Key (username)')) {
            message = 'This Username is unavailable';
          }
        }
        throw new BadRequestException(message);
      }
      throw new InternalServerErrorException(
        'Your request could not be processed',
      );
    }
  }

  async deleteUserAccount(userAccountId: string) {
    await this.userAccountsRepository.delete({ id: userAccountId });
  }

  async updateUsername(userAccountId: string, username: string) {
    try {
      const userAccount = await this.getUserAccountById(userAccountId);
      if (!userAccount) {
        throw new NotFoundException('This user does not exist');
      }
      userAccount.username = username;
      const updatedUserAccount =
        await this.userAccountsRepository.save(userAccount);
      return {
        user: {
          id: updatedUserAccount.id,
          username: updatedUserAccount.username,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'Your request could not be processed',
      );
    }
  }
}
