import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsService {
    private roomModel;
    constructor(roomModel: Model<RoomDocument>);
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    findAll(): Promise<Room[]>;
    findOne(id: string): Promise<Room>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(id: string): Promise<any>;
}
