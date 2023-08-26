import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Snippet } from './schema/snippet.schema';
import { CreateSnippetDto, UpdateSnippetDTO } from './dto/create-snippet-dto';
import { FoldersService } from 'src/folders/folders.service';

@Injectable()
export class SnippetsService {
    constructor(
        @InjectModel('snippets')
        private readonly snippetsModel: Model<Snippet>,
        @Inject(forwardRef(()=> FoldersService))
		private folderService: FoldersService
    ){}

    //Create
    async createSnippet(createSnippetDto: CreateSnippetDto): Promise<Snippet>{
        const snippet = new this.snippetsModel(createSnippetDto);
        await snippet.save();

        await this.folderService.addSnippet(snippet.parentFolder, snippet.id);
        return snippet;
    }

    //Get by id
    async getSnippetById(id: string): Promise<Snippet>{
        return await this.snippetsModel.findById(id);
    }

    //Get by user id
    async getSnippetsByUser(userId: string): Promise<Snippet[]>{
        return await this.snippetsModel.find({user:userId});
    }

    //update 
    async updateSnippet(id: string, updateSnippetDTO: UpdateSnippetDTO){
        return await this.snippetsModel.findByIdAndUpdate(
            id, 
            {code: updateSnippetDTO.code, modifiedAt: Date.now()}, 
            {new: true}
        )
    }

    //delete
    async deleteSnippet(id: string): Promise<Snippet>{
        const snippetToBeDeleted = await this.getSnippetById(id);

        await this.folderService.removeSnippet(snippetToBeDeleted.parentFolder, id);
        return await this.snippetsModel.findByIdAndDelete(id);
    }
}
