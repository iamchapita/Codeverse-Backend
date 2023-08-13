import { File } from "src/files/schema/file.schema";
import { Folder } from "src/folders/schema/folder.schema";
import { User } from "src/users/schema/user.schema";

export interface CreateProjectDto{
    readonly name: string;
    readonly description: string;
    readonly locatedInFolder: Folder;
    readonly user: User;
}

export class UpdateProjectDto{
    readonly name: string;
    readonly description: string;
    readonly locatedInFolder: Folder;
    readonly user: User;
    readonly files: File[];
    readonly colaborators: User[];
}