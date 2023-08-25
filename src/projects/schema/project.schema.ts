import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

import { File } from "../../files/schema/file.schema";
import { User } from "src/users/schema/user.schema";
import { Folder } from "src/folders/schema/folder.schema";

@Schema()
export class Project {
	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "folders",
		required: true,
	})
	parentFolder: string;

	@Prop()
	modifiedAt: Date;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	})
	user: User;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }] })
	files: Array<File>;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }] })
	colaborators: Array<User>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
