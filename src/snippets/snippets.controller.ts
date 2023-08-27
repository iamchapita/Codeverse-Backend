import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
} from "@nestjs/common";
import { CreateSnippetDto, UpdateSnippetDTO } from "./dto/create-snippet-dto";
import { SnippetsService } from "./snippets.service";
import { Snippet } from "./schema/snippet.schema";

@Controller("snippets")
export class SnippetsController {
	constructor(private snippetsService: SnippetsService) {}

	@Post("/")
	create(@Body() createSnippetDto: CreateSnippetDto): Promise<Snippet> {
		return this.snippetsService.createSnippet(createSnippetDto);
	}

	@Get("/:id")
	getById(@Param("id") id: string): Promise<Snippet> {
		return this.snippetsService.getSnippetById(id);
	}

	@Get("/user/:userId")
	getAll(@Param("userId") userId: string): Promise<Snippet[]> {
		return this.snippetsService.getSnippetsByUser(userId);
	}

	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateSnippetDto: UpdateSnippetDTO
	): Promise<Snippet> {
		return this.snippetsService.updateSnippet(id, updateSnippetDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string): Promise<Snippet> {
		return this.snippetsService.deleteSnippet(id);
	}
}
