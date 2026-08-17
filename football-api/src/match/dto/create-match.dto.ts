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
  @IsNotEmpty({ message: 'El equipo local es obligatorio' })
  @IsUUID('4', { message: 'El ID del equipo local debe ser un UUID válido' })
  homeTeamId!: string;

  @IsNotEmpty({ message: 'El equipo visitante es obligatorio' })
  @IsUUID('4', { message: 'El ID del equipo visitante debe ser un UUID válido' })
  awayTeamId!: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha debe tener un formato ISO válido' })
  matchDate?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  homeScore?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  awayScore?: number;

  @IsOptional()
  @IsEnum(Status, { message: 'El estado no es válido' })
  status?: Status;
}