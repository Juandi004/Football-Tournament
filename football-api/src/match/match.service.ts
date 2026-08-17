import { Injectable } from '@nestjs/common';
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
    return await this.prismaService.match.create({
      data: createMatchDto,
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })
  }

  async update(id: string, updateMatchDto: UpdateMatchDto){
   return await this.prismaService.match.update({
      where: {id},
      data: updateMatchDto
    })
  }

  async delete(id: string){
   return await this.prismaService.match.delete({
      where: {id}
    })
  }

  }
