import { IsEmail,IsOptional, IsString } from "class-validator";

export class UpdateAdminDto{

    @IsOptional()
    @IsString()
    name: string;
 
    @IsOptional()
    @IsString()
    age: number;

    @IsOptional()
    @IsEmail()
    email: string;
   
}