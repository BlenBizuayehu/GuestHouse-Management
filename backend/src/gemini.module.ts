// gemini.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeminiService } from './gemini.service';

@Global() // Optional: only use if you need this service available app-wide
@Module({
  imports: [ConfigModule], // Required for ConfigService
  providers: [GeminiService],
  exports: [GeminiService], // Important: must export the service
})
export class GeminiModule {}