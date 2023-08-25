import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Project } from "src/projects/schema/project.schema";
import { Snippet } from "src/snippets/schema/snippet.schema";
import { User } from "src/users/schema/user.schema";

@Schema()
export class Folder {
	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "folders" })
	parentFolder: string;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;

	@Prop()
	modifiedAt: Date;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	})
	user: User;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
		default: [],
	})
	projects: Array<Project>;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "folders" }],
		default: [],
	})
	folders: Array<Folder>;

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "snippets" }],
		default: [],
	})
	snippets: Array<Snippet>;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
