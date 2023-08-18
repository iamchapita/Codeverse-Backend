import { Plan } from "../schema/user.schema";

export class CreateUserDto {
	readonly uid: string;
	readonly name: string;
	readonly email: string;
	readonly plan: Plan;
}

export class UpdateUserDto {
	readonly uid: string;
	readonly name: string;
	readonly email: string;
	readonly plan: Plan;
}

export class UpdateUserPlanDto {
	readonly plan: Plan;
}
