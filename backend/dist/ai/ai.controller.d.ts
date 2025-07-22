import { GeminiService } from '../gemini.service';
import { GenerateWelcomeDto, SummarizeReviewsDto } from '../ai.dto';
export declare class AiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    summarizeReviews(body: SummarizeReviewsDto): Promise<{
        summary: string;
    }>;
    generateWelcomeMessage(body: GenerateWelcomeDto): Promise<{
        message: string;
    }>;
}
