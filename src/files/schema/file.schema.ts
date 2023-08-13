import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Type{
    html = 'HTML',
    css = 'CSS',
    js = 'JS',
}

@Schema()
export class File{
    @Prop()
    type: Type;

    @Prop()
    content: string;

    @Prop({type:Date, default:Date.now})
    createdAt: Date;

    @Prop()
    modifiedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);