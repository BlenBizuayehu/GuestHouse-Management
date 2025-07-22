import { Model } from 'mongoose';
import { GuestDocument } from './schemas/guest.schema';
interface GuestDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}
export declare class GuestsService {
    private guestModel;
    constructor(guestModel: Model<GuestDocument>);
    findOrCreate(guestDto: GuestDto): Promise<GuestDocument>;
}
export {};
