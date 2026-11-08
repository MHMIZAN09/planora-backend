import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() payload: RegisterDto) {
        const result = await this.authService.register(payload);

        return {
            success: true,
            statusCode:HttpStatus.CREATED,
            message: 'User registered successfully',
            data: result,
        };
    }
}
