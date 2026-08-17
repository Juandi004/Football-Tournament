import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/base.service';

@Injectable()
export class PlayerService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.player);
  }

  findAll(page = 1, limit = 10) {
    return this.findAllPaginated(page, limit);
  }

  findAllWithTeam() {
    return this.prismaService.player.findMany({
      include: { team: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.player.findUnique({
      where: { id },
      include: { team: true },
    });
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.prismaService.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }
}
