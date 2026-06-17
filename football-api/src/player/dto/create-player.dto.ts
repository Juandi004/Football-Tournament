import { IsString, IsUUID } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  number!: string;

  @IsString()
  name!: string;

  @IsUUID()
  teamId!: string;
}
