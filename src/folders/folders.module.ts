import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderSchema } from './schema/folder.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature( [{name:'folders', schema:FolderSchema}] ),
    UsersModule
  ],
  providers: [FoldersService],
  exports: [FoldersService],
  controllers: [FoldersController]
})
export class FoldersModule {}
