import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Folder } from "./schema/folder.schema";
import mongoose, { Model } from "mongoose";
import { CreateFolderDto, UpdateFolderDto } from "./dto/folder-dto";
import { Project } from "src/projects/schema/project.schema";
import { Snippet } from "src/snippets/schema/snippet.schema";
import { SnippetsService } from "src/snippets/snippets.service";
import { ProjectsService } from "src/projects/projects.service";

@Injectable()
export class FoldersService {
	constructor(
		@InjectModel("folders")
		private readonly foldersModel: Model<Folder>,
        private readonly snippetsService: SnippetsService,
        private readonly projectsService: ProjectsService
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
        await this.projectsService.deleteProject(projectId);
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
        await this.deteleFolder(folderId);
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
        await this.snippetsService.deleteSnippet(snippetId);
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
        if(!folderToBeDeleted)
            return;
        //-----------------------------------------
        //eliminar projects hijos
        if(folderToBeDeleted.folders.length > 0)
            await this.projectsService.deleteManyProjects(folderToBeDeleted.projects);
        
        //eliminar snippets hijos
        if(folderToBeDeleted.snippets.length > 0)
            await this.snippetsService.deleteManySnippets(folderToBeDeleted.snippets);
        
        //eliminar folders hijos
        if(folderToBeDeleted.folders.length > 0)
            await this.deleteManyFolders(folderToBeDeleted.folders);
        //-----------------------------------------
        await this.removeFolder(folderToBeDeleted.parentFolder, id);
        // return await this.foldersModel.findByIdAndDelete(id);
        return await this.foldersModel.findByIdAndDelete(id);
        
    }

    // detalle con anidados
    async deleteManyFolders(ids: string[]){
        return await this.foldersModel.deleteMany(
            {
                _id: {$in: ids}
            }
        )
    }
 
}