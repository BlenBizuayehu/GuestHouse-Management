// backend/src/public/public.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from 'src/rooms/rooms.module';
import { BookingsModule } from '../bookings/bookings.module';
import { Room, RoomSchema } from '../rooms/schemas/room.schema';
import { PublicController } from './public.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    BookingsModule,
    RoomsModule
  ],
  controllers: [PublicController],
})
export class PublicModule {}