import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeamService {

  constructor(private readonly prismaService: PrismaService) {}

  create(createTeamDto: CreateTeamDto) {

    const {players, ...teamData} = createTeamDto

    return this.prismaService.team.create({
      data: {
        ...teamData,
        ...(players && {
          players: {
            connect: players.map((playerId)=>({id: playerId}))
          }
        })
      }
    });
  }

  findAll() {
    return this.prismaService.team.findMany({
      include: {players: true}
    });
  }

  findOne(id: string) {
    return this.prismaService.team.findUnique({
      where: {id},
      include: {players: true}
    });
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {

    const {players, ...teamData}=updateTeamDto

    return this.prismaService.team.update({
      data: {
        ...teamData,
        ...(players && {
          players: {
            set: players.map((playerId)=>({id: playerId}))
          }
        })
      },
      where: {id}
    });
  }

  remove(id: string) {
    return this.prismaService.team.delete({
      where: {id},
    });
  }
}
