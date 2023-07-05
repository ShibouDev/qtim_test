import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewsDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
}