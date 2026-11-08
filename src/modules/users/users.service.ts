import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { RegisterDto } from '../auth/dto/register.dto.js';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findByEmail(email: string) {
        return this.prisma.users.findUnique({
            where: { email, isDeleted: false },
        });
    }

    async findById(id: string) {
        return this.prisma.users.findUnique({
            where: { id, isDeleted: false },
        });
    }

    async createUser(payload: RegisterDto) {
        const user = await this.prisma.users.create({
            data: {
                email: payload.email,
                name: payload.name,
                password:payload.password,
            },
            omit:{
                password:true
            }
        })
        return user;
    }
}
