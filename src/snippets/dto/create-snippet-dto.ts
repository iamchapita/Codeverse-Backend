import { User } from "src/users/schema/user.schema";
import { Type } from "../../files/schema/file.schema";

export class CreateSnippetDto {
	readonly name: string;
	readonly type: Type;
	readonly code: string;
	readonly parentFolder: string;
	readonly user: User;
}

export class UpdateSnippetDTO {
	readonly code: string;
	readonly parentFolder: string;
}
