import {IsDefined, IsString} from "class-validator";

export class CreateTodoDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;
}
