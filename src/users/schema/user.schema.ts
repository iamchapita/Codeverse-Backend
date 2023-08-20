import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Plan {
	free = "free",
	x = "x",
	y = "y",
}

@Schema()
export class User {
	@Prop({ required: true })
	uid: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ default: Plan.free })
	plan: Plan;

	@Prop({ type: Date, default: Date.now })
	createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
