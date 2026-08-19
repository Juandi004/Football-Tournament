import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/base.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.user)
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prismaService.user.create({
      data: {
        ...createUserDto, password: hashedPassword
      }
    });
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {id}
    }
    )
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = {...updateUserDto}

    if(data.password){
      data.password = await bcrypt.hash(data.password, 10)
    }

    return this.prismaService.user.update({
      where: {id},
      data: data
    })
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: {id}
    })
  }

  async findByEmail(email: string) {
  return this.prismaService.user.findUnique({
    where: { email },
  });
}
}
