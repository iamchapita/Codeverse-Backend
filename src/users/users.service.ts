import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import {
	CreateUserDto,
	UpdateUserDto,
	UpdateUserPlanDto,
} from "./dto/user-dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel("users")
		private readonly usersModel: Model<User>
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = new this.usersModel(createUserDto);
		await user.save();
		return user;
	}

	async getUserById(id: string): Promise<User> {
		return this.usersModel.findById(id);
	}

	async getUserByUid(uid: string): Promise<User | null> {
		return this.usersModel.findOne({ uid }).exec();
	}

	async deleteUserById(id: string): Promise<User> {
		return this.usersModel.findByIdAndDelete(id);
	}

	async updateUserById(
		id: string,
		updateUserDto: UpdateUserDto
	): Promise<User> {
		return this.usersModel.findByIdAndUpdate(id, updateUserDto, {
			new: true,
		});
	}

	async updateUserPlan(
		id: string,
		updateUserPlan: UpdateUserPlanDto
	): Promise<User> {
		return this.usersModel.findByIdAndUpdate(id, updateUserPlan, {
			new: true,
		});
	}
}
