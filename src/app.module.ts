import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { ProjectsModule } from './projects/projects.module';
import { SnippetsModule } from './snippets/snippets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb+srv://codeadmin:2rOsaRWrvF2sxDbS@codeverse-cluster.ajx9zkm.mongodb.net/codeverse?retryWrites=true&w=majority'),
    ProjectsModule,
    FilesModule,
    UsersModule,
    SnippetsModule,
    FoldersModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
