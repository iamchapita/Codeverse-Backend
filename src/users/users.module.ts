import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'users', schema:UserSchema}])
  ],
  providers: [UsersService],
  exports:[UsersService, MongooseModule],
  controllers: [UsersController]
})
export class UsersModule {}
