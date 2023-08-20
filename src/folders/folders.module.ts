import { Module, forwardRef } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './schema/folder.schema';
import { ProjectsModule } from 'src/projects/projects.module';
import { SnippetsModule } from 'src/snippets/snippets.module';

@Module({
  imports:[
    MongooseModule.forFeature( [{name:'folders', schema:FolderSchema}] ),
    forwardRef(()=> SnippetsModule),
    forwardRef(()=> ProjectsModule)
  ],
  providers: [FoldersService],
  exports: [FoldersService],
  controllers: [FoldersController]
})
export class FoldersModule {}
