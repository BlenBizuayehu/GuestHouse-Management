import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class GeminiService implements OnModuleInit {
    private configService;
    private ai;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    summarizeReviews(reviews: string): Promise<string>;
    generateWelcomeMessage(guestName: string, bookingDetails: string): Promise<string>;
}
