import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  
  constructor(private readonly prismaService: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.prismaService.player.create({
      data: createPlayerDto,
    });
  }

  findAll() {
    return this.prismaService.player.findMany();
  }

  findOne(id: string) {
    return this.prismaService.player.findUnique({
      where: {id},
    });
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.prismaService.player.update({
      where: {id},
      data: updatePlayerDto
    });
  }

  remove(id: string) {
    return this.prismaService.player.delete({
      where: {id},
    });
  }
}
