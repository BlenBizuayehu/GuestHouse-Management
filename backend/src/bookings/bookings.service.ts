
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GuestsService } from '../guests/guests.service';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import { RoomStatus } from '../types';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private guestsService: GuestsService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { guest: guestDto, roomId, checkInDate, checkOutDate, numberOfGuests } = createBookingDto;
    
    // Find or create the guest
    const guest = await this.guestsService.findOrCreate(guestDto);

    // Find the room and check availability
    const room = await this.roomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID "${roomId}" not found`);
    }
    if (room.status !== RoomStatus.Available) {
        throw new BadRequestException('The selected room is not available for booking.');
    }

    // Calculate total cost
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    if (nights <= 0) {
        throw new BadRequestException('Check-out date must be after check-in date.');
    }
    const totalCost = nights * room.pricePerNight;

    // Create the booking
    const createdBooking = new this.bookingModel({
      guest: guest._id,
      room: room._id,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalCost,
      status: 'Confirmed',
    });

    // Update room status to Occupied
    room.status = RoomStatus.Occupied;
    await room.save();

    return createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel
      .find()
      .populate('guest')
      .populate('room')
      .sort({ checkInDate: -1 })
      .exec();
  }
}