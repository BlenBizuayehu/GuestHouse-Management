
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GuestDocument = Guest & Document;

@Schema({ timestamps: true })
export class Guest {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);