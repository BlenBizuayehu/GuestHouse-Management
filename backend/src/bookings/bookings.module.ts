
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { GuestsModule } from '../guests/guests.module';
import { Room, RoomSchema } from '../rooms/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Booking.name, schema: BookingSchema },
        { name: Room.name, schema: RoomSchema }, // Needed to update room status
    ]),
    GuestsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}