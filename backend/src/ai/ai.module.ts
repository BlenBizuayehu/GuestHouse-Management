// ai.module.ts
import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini.module'; // adjust path as needed
import { AiController } from './ai.controller';

@Module({
  imports: [GeminiModule], // Import the module that provides GeminiService
  controllers: [AiController],
})
export class AiModule {}