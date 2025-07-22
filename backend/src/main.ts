
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins for development
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Increase payload size limits for image uploads
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Set a global prefix for all routes
  app.setGlobalPrefix('api');
  
  // Use validation pipes to automatically validate incoming DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Start the application on port 3001
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
