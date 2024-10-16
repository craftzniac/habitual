import { Injectable } from '@nestjs/common';
import { users } from 'src/mockData';
import { User } from 'src/types';

@Injectable()
export class UsersService {
  /**
   * finds the user with the matching email address
   */
  findOne(email: string): User | undefined {
    const user = users.find((user) => user.email === email);
    return user;
  }
}
