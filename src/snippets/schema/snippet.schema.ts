import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "../../files/schema/file.schema";
import { User } from "src/users/schema/user.schema";
import mongoose from "mongoose";


@Schema()
export class Snippet{
    @Prop()
    type: Type;

    @Prop()
    code: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'users', required: true})
    user: User;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'folders', required: true})
    parentFolder: string;

    @Prop({type:Date, default:Date.now})
    createdAt: Date;

    @Prop()
    modifiedAt: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);