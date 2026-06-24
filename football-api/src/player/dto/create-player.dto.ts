import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @ApiProperty()
  number!: string;

  @IsString()
  @ApiProperty()
  name!: string;

  @IsUUID()
  @ApiProperty()
  teamId!: string;
}
