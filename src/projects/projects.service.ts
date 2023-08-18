import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto, UpdateProjectDto } from './dto/project-dto';
import { FoldersService } from 'src/folders/folders.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel('projects')
        private readonly projectsModel: Model<Project>,
        private folderService: FoldersService
    ){}

    async createProject(createProjectDto: CreateProjectDto): Promise<Project>{
        const project = new this.projectsModel(createProjectDto);
        await project.save();

        await this.folderService.addProject(project.locatedInFolder, project.id);
        return project;
    }

    async getProjectById(id: string): Promise<Project>{
        return this.projectsModel.findById(id);
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>{
        return this.projectsModel.findByIdAndUpdate(
            id,
            {updateProjectDto, modifiedAt: Date.now()},
            {new: true}
        )
    }

    async addFile(id: string, fileId: string): Promise<Project>{
        return this.projectsModel.findByIdAndUpdate(
            id,
            {
                $push: {files: fileId},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async removeFile(id: string, fileId: string): Promise<Project>{
        return this.projectsModel.findByIdAndUpdate(
            id,
            {
                $pull: {files: fileId},
                modifiedAt: Date.now()
            },
            {new: true}
        );
    }

    async addColaborator(id: string, userId: string): Promise<Project>{
        return this.projectsModel.findByIdAndUpdate(
            id,
            {
                $push: {colaborators: userId}
            },
            {new: true}
        )
    }

    async removeColaborator(id: string, userId: string): Promise<Project>{
        return this.projectsModel.findByIdAndUpdate(
            id,
            {
                $pull: {colaborators: userId}
            },
            {new: true}
        )
    }

    async deleteProject(id: string): Promise<Project>{
        const projectToBeDeleted = await this.getProjectById(id);

        await this.folderService.removeProject(projectToBeDeleted.locatedInFolder, id);
        return await this.projectsModel.findByIdAndDelete(id);
    }
}
