
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guest, GuestDocument } from './schemas/guest.schema';

interface GuestDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

@Injectable()
export class GuestsService {
  constructor(@InjectModel(Guest.name) private guestModel: Model<GuestDocument>) {}

  async findOrCreate(guestDto: GuestDto): Promise<GuestDocument> {
    const existingGuest = await this.guestModel.findOne({ email: guestDto.email }).exec();
    if (existingGuest) {
      return existingGuest;
    }
    const newGuest = new this.guestModel(guestDto);
    return newGuest.save();
  }
}