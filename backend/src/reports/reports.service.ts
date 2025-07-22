
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async getRevenueByRoomType(): Promise<{ name: string; value: number }[]> {
    const result = await this.bookingModel.aggregate([
      {
        $lookup: {
          from: 'rooms', // The name of the Room collection in MongoDB
          localField: 'room',
          foreignField: '_id',
          as: 'roomDetails',
        },
      },
      {
        $unwind: '$roomDetails',
      },
      {
        $group: {
          _id: '$roomDetails.type', // Group by room type
          totalRevenue: { $sum: '$totalCost' }, // Sum the totalCost for each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          name: '$_id', // Rename _id to name
          value: '$totalRevenue', // Rename totalRevenue to value
        },
      },
      {
        $sort: { value: -1 }, // Sort by revenue descending
      },
    ]);

    return result;
  }
}