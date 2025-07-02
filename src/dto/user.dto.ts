import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(5, 150)
    name: string

    @IsEmail()
    @Length(10, 200)
    email: string
}