import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewsDtoUpdate {
    @IsNotEmpty()
    @IsNumber()
    newsId: number;
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
}