import { User } from "src/users/schema/user.schema";
import { Folder } from "../schema/folder.schema";
import { Snippet } from "src/snippets/schema/snippet.schema";
import { Project } from "src/projects/schema/project.schema";

export class CreateFolderDto{
    readonly _id: string;
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly parentFolder: string;
}

export class UpdateFolderDto{
    readonly _id: string;
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly parentFolder: string;
}