import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsModule } from '../guests/guests.module';
import { Guest, GuestSchema } from '../guests/schemas/guest.schema';
import { RoomsModule } from '../rooms/rooms.module'; // Ensure this is imported
import { Room, RoomSchema } from '../rooms/schemas/room.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking, BookingSchema } from './schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Guest.name, schema: GuestSchema }
    ]),
    RoomsModule, // This provides RoomsService
    GuestsModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService]
})
export class BookingsModule {}