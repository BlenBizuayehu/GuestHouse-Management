
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GeminiService } from '../gemini.service';
import { GenerateWelcomeDto, SummarizeReviewsDto } from '../ai.dto';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('summarize')
  async summarizeReviews(@Body() body: SummarizeReviewsDto) {
    const summary = await this.geminiService.summarizeReviews(body.reviews);
    return { summary };
  }

  @Post('generate-welcome')
  async generateWelcomeMessage(@Body() body: GenerateWelcomeDto) {
    const message = await this.geminiService.generateWelcomeMessage(
      body.guestName,
      body.bookingDetails,
    );
    return { message };
  }
}