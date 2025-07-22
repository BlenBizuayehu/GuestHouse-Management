
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { RoomStatus } from '../types';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async getDashboardStats() {
    const totalRooms = await this.roomModel.countDocuments().exec();
    const availableRooms = await this.roomModel.countDocuments({ status: RoomStatus.Available }).exec();
    const occupiedRooms = await this.roomModel.countDocuments({ status: RoomStatus.Occupied }).exec();
    
    const today = new Date();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const activeBookings = await this.bookingModel.find({
        status: { $in: ['CheckedIn', 'Confirmed'] },
        checkInDate: { $lte: today },
        checkOutDate: { $gt: today },
    }).exec();

    const currentGuests = activeBookings.reduce((acc, booking) => acc + booking.numberOfGuests, 0);
    
    // For "Recent Activity", we look for bookings that became Confirmed or CheckedIn today.
    // For simplicity, we check `createdAt` for newly confirmed and `updatedAt` for newly checked-in.
    // This is an approximation. A more robust system might use a dedicated event log.
    const recentCheckIns = await this.bookingModel.find({
        status: 'CheckedIn',
        updatedAt: { $gte: startOfToday }
    }).populate('room', 'number').sort({updatedAt: -1}).limit(2).exec();

    const upcomingCheckOuts = await this.bookingModel.find({
        status: { $in: ['CheckedIn', 'Confirmed'] },
        checkOutDate: { $gte: startOfToday, $lte: endOfToday }
    }).populate('room', 'number').sort({checkOutDate: 1}).limit(2).exec();


    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      currentGuests,
      recentCheckIns,
      upcomingCheckOuts,
    };
  }
}