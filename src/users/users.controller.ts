import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Get()
    getAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: string){
        return this.usersService.findOne(+id);
    }

    @Post()
    createUser(@Body() body: CreateUserDTO){
        return this.usersService.create(body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        return this.usersService.delete(+id);
    }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDTO){
        return this.usersService.update(id, body);
    }
}
