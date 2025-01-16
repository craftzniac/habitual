import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /**
   * finds the user with the matching email address
   */
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      return null;
    }
    delete user.deletedAt;
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    delete user.deletedAt;
    return user;
  }

  /**
   * create a new user in the database
   * */
  async createUser(newUser: SignupDto): Promise<User> {
    try {
      const userEntity = this.usersRepository.create({
        ...newUser,
      });
      const insertResult = await this.usersRepository.insert(userEntity);
      const newUserId = insertResult.identifiers[0].id;

      // get newly created user
      const user = await this.usersRepository.findOneBy({ id: newUserId });

      delete user.password;
      delete user.deletedAt;

      return user;
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

  async deleteUser(userId: string) {
    await this.usersRepository.delete({ id: userId });
  }
}
