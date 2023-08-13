import { Type } from "../schema/file.schema";

export class CreateFileDto {
    readonly type: Type;
    readonly content: string;
}

export class UpdateFileDto {
    readonly content: string;
}