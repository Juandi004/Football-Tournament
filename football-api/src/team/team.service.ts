import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TeamService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsClient: ClientProxy,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { players, ...teamData } = createTeamDto;

    const newTeam = await this.prismaService.team.create({
      data: {
        ...teamData,
        ...(players && {
          players: {
            connect: players.map((playerId) => ({ id: playerId })),
          },
        }),
      },
      include: { players: true },
    });

    this.notificationsClient.emit('team_created', {
      id: newTeam.id,
      name: newTeam.name,
      playersCount: newTeam.players?.length ?? 0,
      createdAt: new Date(),
    });

    return newTeam;
  }

  findAll() {
    return this.prismaService.team.findMany({
      include: { players: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.team.findUnique({
      where: { id },
      include: { players: true },
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const { players, ...teamData } = updateTeamDto;

    const updatedTeam = await this.prismaService.team.update({
      data: {
        ...teamData,
        ...(players && {
          players: {
            set: players.map((playerId) => ({ id: playerId })),
          },
        }),
      },
      where: { id },
      include: { players: true },
    });
    this.notificationsClient.emit('team_updated', {
      id: updatedTeam.id,
      name: updatedTeam.name,
    });

    return updatedTeam;
  }

  async remove(id: string) {
    const deletedTeam = await this.prismaService.team.delete({
      where: { id },
    });

    this.notificationsClient.emit('team_deleted', {
      id: deletedTeam.id,
      name: deletedTeam.name,
    });

    return deletedTeam;
  }
}