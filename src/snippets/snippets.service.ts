import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Snippet } from './schema/snippet.schema';
import { CreateSnippetDto, UpdateSnippetDTO } from './dto/create-snippet-dto';

@Injectable()
export class SnippetsService {
    constructor(
        @InjectModel('snippets')
        private readonly snippetsModel:Model<Snippet>
    ){}

    //Create
    async createSnippet(createSnippetDto: CreateSnippetDto): Promise<Snippet>{
        const snippet = new this.snippetsModel(createSnippetDto);
        await snippet.save();
        return snippet;
    }

    //Get by id
    async getSnippetById(id: string): Promise<Snippet>{
        return this.snippetsModel.findById(id);
    }

    //Get by user id
    async getSnippetsByUser(userId: string): Promise<Snippet[]>{
        return this.snippetsModel.find({user:userId});
    }

    //update 
    async updateSnippet(id: string, updateSnippetDTO: UpdateSnippetDTO){
        return this.snippetsModel.findByIdAndUpdate(
            id, 
            {code: updateSnippetDTO.code, modifiedAt: Date.now()}, 
            {new: true}
        )
    }

    //delete
    async deleteSnippet(id: string): Promise<Snippet>{
        return this.snippetsModel.findByIdAndDelete(id);
    }
}
