import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { Module } from '@nestjs/common';

import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { MongodbConnectionModule } from './mongodb-connection/mongodb-connection.module';
import { ProjectsModule } from './projects/projects.module';
import { SnippetsModule } from './snippets/snippets.module';
import { UsersModule } from './users/users.module';

import { ProjectsController } from './projects/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongodbConnectionModule,
    ProjectsModule,
    FilesModule,
    UsersModule,
    SnippetsModule,
    FoldersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
