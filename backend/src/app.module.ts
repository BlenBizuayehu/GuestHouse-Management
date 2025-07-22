
import { Module, BadRequestException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { PublicModule } from './public/public.module';
import { GeminiService } from './gemini.service';
import { BookingsModule } from './bookings/bookings.module';
import { GuestsModule } from './guests/guests.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AiModule } from './ai/ai.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new BadRequestException('MONGO_URI environment variable is not set. Please provide a valid MongoDB connection string.');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
    PublicModule,
    BookingsModule,
    GuestsModule,
    DashboardModule,
    AiModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [GeminiService],
})
export class AppModule {}