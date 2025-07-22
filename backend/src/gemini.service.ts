
import { GoogleGenAI } from '@google/genai';
import { Injectable, OnModuleInit, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class GeminiService implements OnModuleInit {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('API_KEY');
    if (!apiKey) {
      console.warn(
        'API_KEY environment variable not set. Gemini API calls will fail.',
      );
      this.ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY_placeholder' });
    } else {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async summarizeReviews(reviews: string): Promise<string> {
    if (!this.configService.get<string>('API_KEY')) {
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
    } catch (error) {
      console.error('Error summarizing reviews:', error);
      return "Sorry, I couldn't summarize the reviews at this time. Please check the backend console for errors.";
    }
  }

  async generateWelcomeMessage(
    guestName: string,
    bookingDetails: string,
  ): Promise<string> {
    if (!this.configService.get<string>('API_KEY')) {
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
    } catch (error) {
      console.error('Error generating welcome message:', error);
      return "Sorry, I couldn't generate a welcome message at this time. Please check the backend console for errors.";
    }
  }
}
