import { NotFoundException } from '@nestjs/common';

export class BaseService {
  constructor(private readonly delegate: any) {}

  create(data: any) {
    return this.delegate.create({ data });
  }

  findAll() {
    return this.delegate.findMany();
  }

  async findOne(id: string) {
    const record = await this.delegate.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('No encontrado');
    return record;
  }

  update(id: string, data: any) {
    return this.delegate.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.delegate.delete({ where: { id } });
  }
}