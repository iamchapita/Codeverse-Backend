import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto, UpdateProjectDto } from "./dto/project-dto";
import { Project } from "./schema/project.schema";

@Controller("projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Post()
	createProject(
		@Body() createProjectDto: CreateProjectDto
	): Promise<Project> {
		return this.projectsService.createProject(createProjectDto);
	}

	@Get("/:id")
	getProjectById(@Param("id") id: string): Promise<Project> {
		return this.projectsService.getProjectById(id);
	}

	@Put("/:id")
	updateProjectById(
		@Param("id") id: string,
		@Body() updateProjectDto: UpdateProjectDto
	): Promise<Project> {
		return this.projectsService.updateProject(id, updateProjectDto);
	}

	@Put("/:projectId/add-file/:fileId")
	addFileToProject(
		@Param("projectId") projectId: string,
		@Param("fileId") fileId: string
	): Promise<Project> {
		return this.projectsService.addFile(projectId, fileId);
	}

	@Put("/:projectId/remove-file/:fileId")
	removeFileOfProject(
		@Param("projectId") projectId: string,
		@Param("fileId") fileId: string
	): Promise<Project> {
		return this.projectsService.removeFile(projectId, fileId);
	}

	@Put("/:projectId/add-colab/:userId")
	addColaboratorToProject(
		@Param("projectId") projectId: string,
		@Param("userId") userId: string
	): Promise<Project> {
		return this.projectsService.addColaborator(projectId, userId);
	}

	@Put("/:projectId/remove-colab/:userId")
	removeColaboratorOfProject(
		@Param("projectId") projectId: string,
		@Param("userId") userId: string
	): Promise<Project> {
		return this.projectsService.removeColaborator(projectId, userId);
	}

	@Delete("/:id")
	deleteProject(@Param("id") id: string): void {
		this.projectsService.deleteProject(id);
	}
}
