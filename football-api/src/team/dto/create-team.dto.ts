import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @ApiProperty()
    name!: string

    @IsArray()
    players?: string[]

    @IsArray()
    @ApiProperty()
    matches?: string[]
}
