import { IsString } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    password: string;
}