import { Module, forwardRef } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectSchema } from "./schema/project.schema";
import { ProjectsController } from "./projects.controller";
import { FoldersModule } from "src/folders/folders.module";
import { FilesModule } from "src/files/files.module";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "projects", schema: ProjectSchema },
		]),
		forwardRef(()=>FoldersModule),
		FilesModule,
	],
	providers: [ProjectsService],
	exports: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule {}
