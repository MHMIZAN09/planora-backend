import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('Planora API')
        .setDescription('The Planora API description')
        .setVersion('1.0')
        .addTag('Planora')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    const port = configService.getOrThrow<number>('PORT');

    await app.listen(port);
    console.log(`Application is running on http://localhost:${port}/api`);
    console.log(`Swagger is running on http://localhost:${port}/api/docs`);
}
await bootstrap();
