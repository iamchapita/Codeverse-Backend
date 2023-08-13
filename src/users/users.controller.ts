import { Controller, Get, Post, Put, Delete, Body, Param, Res,  } from '@nestjs/common';
import { User } from "./schema/user.schema";
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UpdateUserPlanDto } from './dto/user-dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ){}

    @Post('/')
    createUser(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.usersService.createUser(createUserDto);
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<User>{
        return this.usersService.getUserById(id);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<User>{
        return this.usersService.updateUserById(id, updateUser);
    }

    @Put('/:id/plan')
    updateUserPlan(@Param('id') id: string, @Body() updateUserPlan: UpdateUserPlanDto): Promise<User>{
        return this.usersService.updateUserPlan(id, updateUserPlan);
    }

    @Delete('/:id')
    deleteUser(@Param('id')id: string): Promise<User>{
        return this.usersService.deleteUserById(id)
    }

}
