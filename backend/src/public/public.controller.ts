
import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';

@Controller('public')
export class PublicController {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  @Get('rooms')
  async findAllRooms() {
    return this.roomModel.find().exec();
  }
}
