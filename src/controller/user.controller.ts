import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post()
    postUser(@Body() userData: CreateUserDto): Promise<User>{
        return this.userService.createUser(userData)
    }

    @Get()
    getUser(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
        @Query('name')name?: string, 
        @Query('email')email?: string
    ){
        return this.userService.listUser(name, email, page, limit);
    }

    @Get("/:id")
    async getUserId(@Param('id') id: string): Promise<User>{
        const user = await this.userService.listUserId(id)
        if(user == null){
            throw new NotFoundException("Usuário não encontrado")
        }
        return user
    }
}