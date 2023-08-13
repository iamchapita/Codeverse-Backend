import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schema/file.schema';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'files',schema:FileSchema}])
  ],
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
