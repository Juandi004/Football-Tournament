import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
  async onModuleInit() {
    // 🕵️‍♂️ ESTE ESPÍA NOS VA A DECIR LA VERDAD:
    console.log('🔌 PRISMA INTENTANDO CONECTAR A:', process.env.DATABASE_URL);
    
    await this.$connect();
  }
}
