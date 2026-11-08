import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PasswordHasher } from '@nestjs/authentication';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly prismaService: PrismaService,
        private readonly passwordHasher: PasswordHasher,
    ) {}


    async register(payload:RegisterDto) {
        const email = payload.email.trim().toLowerCase();
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }

        // Hash the password before saving
        const hashedPassword = await this.passwordHasher.hash(payload.password);
    
        return this.usersService.createUser({
            ...payload,
            email,
            password: hashedPassword,
        });
    }
}