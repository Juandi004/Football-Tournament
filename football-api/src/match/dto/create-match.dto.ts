import { ApiProperty } from '@nestjs/swagger';
import { 
  IsDateString, 
  IsEnum, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsUUID, 
  Min 
} from 'class-validator';
import { Status } from 'generated/prisma/enums';

export class CreateMatchDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El equipo local es obligatorio' })
  @IsUUID('4', { message: 'El ID del equipo local debe ser un UUID válido' })
  homeTeamId!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El equipo visitante es obligatorio' })
  @IsUUID('4', { message: 'El ID del equipo visitante debe ser un UUID válido' })
  awayTeamId!: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener un formato ISO válido' })
  matchDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  homeScore?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  awayScore?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status, { message: 'El estado no es válido' })
  status?: Status;
}