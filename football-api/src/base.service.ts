import { NotFoundException } from '@nestjs/common';

export class BaseService {
  constructor(private readonly delegate: any) {}

  create(data: any) {
    return this.delegate.create({ data });
  }

  findAll() {
    return this.delegate.findMany();
  }

  async findAllPaginated(page = 1, limit = 10) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(50, Math.max(1, Number(limit) || 10));

    const [records, total] = await Promise.all([
      this.delegate.findMany({
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),
      this.delegate.count(),
    ]);

    return {
      data: records,
      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
        hasNextPage: safePage * safeLimit < total,
      },
    };
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