import { User } from "src/users/schema/user.schema";
import { Folder } from "../schema/folder.schema";
import { Snippet } from "src/snippets/schema/snippet.schema";
import { Project } from "src/projects/schema/project.schema";

export class CreateFolderDto{
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly parentFolder: string;
}

export class UpdateFolderDto{
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly parentFolder: string;
    readonly projects: Project[];
    readonly folders: Folder[];
    readonly snippets: Snippet[];
}