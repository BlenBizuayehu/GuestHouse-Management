import { IsNotEmpty, IsString } from 'class-validator';

export class SummarizeReviewsDto {
  @IsString()
  @IsNotEmpty()
  reviews: string;
}

export class GenerateWelcomeDto {
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsString()
  @IsNotEmpty()
  bookingDetails: string;
}
