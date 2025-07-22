
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const existingRoom = await this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true }).exec();
    if (!existingRoom) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return existingRoom;
  }

  async remove(id: string): Promise<any> {
    const result = await this.roomModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return { message: 'Room deleted successfully' };
  }
}
