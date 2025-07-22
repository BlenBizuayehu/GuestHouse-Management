
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoomType, RoomStatus } from '../../types';

export type RoomDocument = Room & Document;

@Schema()
class Amenities {
    @Prop({ default: false })
    has_air_conditioning: boolean;
    
    @Prop({ default: false })
    has_tv: boolean;

    @Prop({ default: false })
    has_minibar: boolean;
}

const AmenitiesSchema = SchemaFactory.createForClass(Amenities);


@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, unique: true })
  number: string;

  @Prop({ required: true, enum: Object.values(RoomType) })
  type: RoomType;
  
  @Prop({ required: true, enum: Object.values(RoomStatus), default: RoomStatus.Available })
  status: RoomStatus;
  
  @Prop({ required: true })
  capacity: number;
  
  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: AmenitiesSchema, default: () => ({}) })
  amenities: Amenities;
  
  @Prop({ type: [String], default: [] })
  images: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
