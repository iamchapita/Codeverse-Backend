import { Plan } from "../schema/user.schema";

export class CreateUserDto{
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly plan: Plan;
}

export class UpdateUserDto{
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly plan: Plan;
}

export class UpdateUserPlanDto{
    readonly plan: Plan;
}