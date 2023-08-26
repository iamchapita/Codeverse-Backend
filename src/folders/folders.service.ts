import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Folder } from "./schema/folder.schema";
import mongoose, { Model } from "mongoose";
import { CreateFolderDto, UpdateFolderDto } from "./dto/folder-dto";
import { ProjectsService } from "src/projects/projects.service";
import { SnippetsService } from "src/snippets/snippets.service";

@Injectable()
export class FoldersService {
	constructor(
		@InjectModel("folders")
		private readonly foldersModel: Model<Folder>,
		private readonly projectService: ProjectsService,
		private readonly snippetsService: SnippetsService
	) {}

	async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
		const folder = new this.foldersModel(createFolderDto);
		await folder.save();

		await this.addFolder(folder.parentFolder, folder.id);
		return folder;
	}

	async getFolderById(id: string): Promise<Folder> {
		return await this.foldersModel.findById(id);
	}

	async getFolderChilds(id: string): Promise<Array<Folder>> {
		const parentFolder = await this.foldersModel.findById(id);

		if (!parentFolder) {
			return [];
		} else {
			const childFolders: Array<Folder> = [];

			await Promise.all(
				parentFolder.folders.map(async (folder: any) => {
					const childFolder = await this.getFolderById(folder._id);
					if (childFolder) {
						childFolders.push(...[childFolder]);
					}
				})
			);

			return childFolders;
		}
	}

	async getFolderByUserId(id: string): Promise<Folder | null> {
		return await this.foldersModel.findOne({ user: id });
	}

	async getFolderPopulated(id: string): Promise<Folder> {
		return await this.foldersModel
			.findById(id)
			.populate("users projects folders snippets");
	}

	async updateFolder(
		id: string,
		updateFolderDto: UpdateFolderDto
	): Promise<Folder> {
		const folder = await this.foldersModel.findByIdAndUpdate(
			id,
			{ updateFolderDto, modifiedAt: Date.now() },
			{ new: true }
		);
		return folder;
	}

	async addProject(id: string, projectId: string): Promise<Folder> {
		return await this.foldersModel
			.findByIdAndUpdate(
				id,
				{
					$push: { projects: new mongoose.Types.ObjectId(projectId) },
					modifiedAt: Date.now(),
				},
				{ new: true }
			)
			.exec();
	}

	async removeProject(id: string, projectId: string): Promise<Folder> {
		await this.projectService.deleteProject(projectId);
		return await this.foldersModel.findByIdAndUpdate(
			id,
			{
				$pull: { projects: new mongoose.Types.ObjectId(projectId) },
				modifiedAt: Date.now(),
			},
			{ new: true }
		);
	}

	async addFolder(id: string, folderId: string): Promise<Folder> {
		return await this.foldersModel.findByIdAndUpdate(
			id,
			{
				$push: { folders: new mongoose.mongo.ObjectId(folderId) },
				modifiedAt: Date.now(),
			},
			{ new: true }
		);
	}

	async removeFolder(id: string, folderId: string): Promise<Folder> {
		return await this.foldersModel.findByIdAndUpdate(
			id,
			{
				$pull: { folders: folderId },
				modifiedAt: Date.now(),
			},
			{ new: true }
		);
	}

	async addSnippet(id: string, snippetId: string): Promise<Folder> {
		return await this.foldersModel.findByIdAndUpdate(
			id,
			{
				$push: { snippets: snippetId },
				modifiedAt: Date.now(),
			},
			{ new: true }
		);
	}

	async removeSnippet(id: string, snippetId: string): Promise<Folder> {
		return await this.foldersModel.findByIdAndUpdate(
			id,
			{
				$pull: { snippets: snippetId },
				modifiedAt: Date.now(),
			},
			{ new: true }
		);
	}

	// !Necesito borrar
	// !Folders
	// !Projects
	// !Snippets

	async deleteFolder(id: string): Promise<void> {
		// Paso 1: Obtener la carpeta que se va a eliminar
		const folderToBeDeleted = await this.getFolderById(id);

		// Paso 2: Verificar si la carpeta tiene subcarpetas
		if (
			folderToBeDeleted !== null
		) {

			// Paso 3: Eliminar (si existen) subcarpetas de forma recursiva
			if( folderToBeDeleted.folders.length !== 0 )
			await Promise.all(
				folderToBeDeleted.folders.map(async (folder: any) => {
					await this.deleteFolder(folder._id);
				})
			);

			// Paso 4: Eliminar (si existen) projectos de forma recursiva
			if( folderToBeDeleted.projects.length !== 0 ){
				await Promise.all(
					folderToBeDeleted.projects.map(async (project: any) => {
						await this.projectService.deleteProject(project._id);
					})
				);
			}

			// Paso 5: Eliminar (si existen) snippets de forma recursiva
			if( folderToBeDeleted.snippets.length !== 0 ){
				await Promise.all(
					folderToBeDeleted.snippets.map(async (snippet: any) => {
						await this.snippetsService.deleteSnippet(snippet._id);
					})
				);
			}

			// Paso 6: Obtener el id de la carpeta padre
			const parentFolderId = folderToBeDeleted.parentFolder;

			// Paso 7: Eliminar el id de la carpeta actual del arreglo de folders en el parentFolder
			await this.foldersModel.findByIdAndUpdate(
				parentFolderId,
				{ $pull: { folders: id } },
				{ new: true }
			);
		}

		// Paso 8: Eliminar la carpeta actual
		await this.foldersModel.findByIdAndDelete(id);
	}
}
