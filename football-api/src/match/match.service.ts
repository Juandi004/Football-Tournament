import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { BaseService } from 'src/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchService extends BaseService{
  constructor(private readonly prismaService: PrismaService){ 
    super(PrismaService);}
  

  async findAll(){
   return await this.prismaService.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true
    },
    orderBy: {
      matchDate: 'desc'
    }
   });
  }  

  async findOne(id: string){
   return await this.prismaService.match.findUnique({
      where: {id},
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })
  }

  async create(createMatchDto: CreateMatchDto) {
    if(createMatchDto.homeTeamId == createMatchDto.awayTeamId){
      throw new BadRequestException('El equipo Local y Visitante no pueden ser los mismos');
    }
      return await this.prismaService.match.create({
      data: createMatchDto,
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })
  }

  async update(id: string, updateMatchDto: UpdateMatchDto){
    if(
      updateMatchDto.homeTeamId &&
      updateMatchDto.awayTeamId &&
      updateMatchDto.homeTeamId == updateMatchDto.awayTeamId){
      throw new BadRequestException('El equipo Local y Visitante no pueden ser los mismos');
    }
      return await this.prismaService.match.update({
      where: {id},
      data: updateMatchDto,
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })
  }

  async delete(id: string){
   return await this.prismaService.match.delete({
      where: {id}
    })
  }

  }
