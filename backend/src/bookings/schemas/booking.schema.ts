
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Guest } from '../../guests/schemas/guest.schema';
import { Room } from '../../rooms/schemas/room.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Guest', required: true })
  guest: Guest;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room: Room;

  @Prop({ required: true })
  checkInDate: Date;
  
  @Prop({ required: true })
  checkOutDate: Date;

  @Prop({ required: true })
  numberOfGuests: number;

  @Prop({ required: true })
  totalCost: number;

  @Prop({ 
    required: true, 
    enum: ['Confirmed', 'CheckedIn', 'CheckedOut', 'Cancelled'], 
    default: 'Confirmed' 
  })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);