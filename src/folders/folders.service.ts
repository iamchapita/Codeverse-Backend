import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Folder } from "./schema/folder.schema";
import mongoose, { Model } from "mongoose";
import { CreateFolderDto, UpdateFolderDto } from "./dto/folder-dto";

@Injectable()
export class FoldersService {
	constructor(
		@InjectModel("folders")
		private readonly foldersModel: Model<Folder>
	) {}

    async createFolder(createFolderDto: CreateFolderDto): Promise<Folder>{
        const folder = new this.foldersModel(createFolderDto);
        await folder.save();

        await this.addFolder(folder.parentFolder, folder.id);
        return folder;
    }

    async getFolderById(id: string): Promise<Folder>{
        return await this.foldersModel.findById(id);
    }

    async getFolderPopulated(id: string): Promise<Folder>{
        return await this.foldersModel.findById(id).populate('users projects folders snippets')
    }

    async updateFolder(id: string, updateFolderDto: UpdateFolderDto): Promise<Folder>{
        const folder = await this.foldersModel.findByIdAndUpdate(
            id,
            {updateFolderDto, modifiedAt: Date.now()},
            {new: true}
        );
        return folder; 
    }

    async addProject(id: string, projectId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {projects: new mongoose.Types.ObjectId( projectId )},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async removeProject(id: string, projectId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $pull: {projects: new mongoose.Types.ObjectId( projectId )},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async addFolder(id: string, folderId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {folders: new mongoose.mongo.ObjectId( folderId )},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async removeFolder(id: string, folderId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $pull: {folders: folderId},
                modifiedAt: Date.now()
            },
            {new: true}
        )
    }
    
    async addSnippet(id: string, snippetId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $push: {snippets: snippetId},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async removeSnippet(id: string, snippetId: string): Promise<Folder>{
        return await this.foldersModel.findByIdAndUpdate(
            id,
            {
                $pull: {snippets: snippetId},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async deteleFolder(id: string): Promise<Folder>{
        const folderToBeDeleted = await this.getFolderById(id);
        //comprobar folders hijos
        await this.removeFolder(folderToBeDeleted.parentFolder, id);
        return await this.foldersModel.findByIdAndDelete(id);
    }
}