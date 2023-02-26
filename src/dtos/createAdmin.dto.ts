import { IsEmail, IsString } from "class-validator";

export class CreateAdminDto{

    @IsString()
    name: string;

    @IsString()
    age: number;

    @IsEmail()
    email: string;

}

