"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const genai_1 = require("@google/genai");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let GeminiService = class GeminiService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const apiKey = this.configService.get('API_KEY');
        if (!apiKey) {
            console.warn('API_KEY environment variable not set. Gemini API calls will fail.');
            this.ai = new genai_1.GoogleGenAI({ apiKey: 'YOUR_API_KEY_placeholder' });
        }
        else {
            this.ai = new genai_1.GoogleGenAI({ apiKey });
        }
    }
    async summarizeReviews(reviews) {
        if (!this.configService.get('API_KEY')) {
            return "Cannot summarize reviews: API_KEY is not configured on the backend.";
        }
        try {
            const prompt = `You are an expert hospitality analyst. Summarize the following guest reviews for a guest house manager. 
        Focus on extracting actionable insights. Structure your summary into two sections: 'Key Strengths' and 'Areas for Improvement'. 
        Be concise and use bullet points for each section.

        Reviews:
        ---
        ${reviews}
        ---
        `;
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return response.text;
        }
        catch (error) {
            console.error('Error summarizing reviews:', error);
            return "Sorry, I couldn't summarize the reviews at this time. Please check the backend console for errors.";
        }
    }
    async generateWelcomeMessage(guestName, bookingDetails) {
        if (!this.configService.get('API_KEY')) {
            return "Cannot generate message: API_KEY is not configured on the backend.";
        }
        try {
            const prompt = `You are a friendly and professional guest house host. 
        Generate a short, warm, and personalized welcome message for a guest.
        Keep it under 50 words and friendly.

        Guest Name: ${guestName}
        Booking Details: ${bookingDetails}
        `;
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    thinkingConfig: { thinkingBudget: 0 },
                },
            });
            return response.text;
        }
        catch (error) {
            console.error('Error generating welcome message:', error);
            return "Sorry, I couldn't generate a welcome message at this time. Please check the backend console for errors.";
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map