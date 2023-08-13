import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetSchema } from './schema/snippet.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    UsersModule,
    MongooseModule.forFeature([{name: 'snippets', schema:SnippetSchema}])
  ],
  providers: [SnippetsService],
  exports:[SnippetsService],
  controllers: [SnippetsController]
})
export class SnippetsModule {}
