import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schema/project.schema';
import { ProjectsController } from './projects.controller';

@Module({
  imports:[
    MongooseModule.forFeature( [{name:'projects', schema: ProjectSchema}] )
  ],
  providers: [ProjectsService],
  exports: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
