import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(userData: CreateUserDto): Promise<User>{
        const user = this.userRepository.create(userData)
        return this.userRepository.save(user)
    }

    async listUser(
        name?: string, 
        email?: string,
        page: number = 1,
        limit: number = 15
    ): Promise<{users: User[], total: number}>{
        const where: any = {}
        if(name){
            where.name = Like(`%${name}%`)
        }
        if(email){
            where.email = Like(`%${email}%`)
        }
        const skip = (page - 1) * limit
        const [users, total] = await this.userRepository.findAndCount({
            where,
            skip: skip,
            take: limit
        })
        return {users, total}
    }

    async listUserId(id: string): Promise<User>{
        const user = await this.userRepository.findOneBy({id})
        if(!user){
            return null
        }
        return user
    }
}