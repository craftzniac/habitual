import { Module } from '@nestjs/common';
import { UserAccountsService } from './user-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './entity/user-account.entity';

@Module({
  providers: [UserAccountsService],
  exports: [UserAccountsService],
  imports: [TypeOrmModule.forFeature([UserAccount])],
})
export class UserAccountsModule {}
