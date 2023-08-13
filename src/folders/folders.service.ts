import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './schema/folder.schema';
import mongoose, { Model } from 'mongoose';
import { CreateFolderDto, UpdateFolderDto } from './dto/folder-dto';

@Injectable()
export class FoldersService {
    constructor(
        @InjectModel('folders')
        private readonly foldersModel: Model<Folder>
    ){}

    async createFolder(createFolderDto: CreateFolderDto): Promise<Folder>{
        const folder = new this.foldersModel(createFolderDto);
        await folder.save();
        return folder;
    }

    async getFolderById(id: string): Promise<Folder>{
        return this.foldersModel.findById(id);
    }

    async updateFolder(id: string, updateFolderDto: UpdateFolderDto): Promise<Folder>{
        return this.foldersModel.findByIdAndUpdate(
            id,
            {updateFolderDto, modifiedAt: Date.now()},
            {new: true}
        );
    }

    async addProject(id: string, projectId: string): Promise<Folder>{
        return this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {projects: new mongoose.Types.ObjectId( projectId )},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async addFolder(id: string, projectId: string): Promise<Folder>{
        return this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {folders: new mongoose.mongo.ObjectId( projectId )},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }
    
    async addSnippet(id: string, snippetId: string): Promise<Folder>{
        return this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {snippets: snippetId},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async deteleFolder(id: string): Promise<Folder>{
        return this.foldersModel.findByIdAndDelete(id);
    }
}
