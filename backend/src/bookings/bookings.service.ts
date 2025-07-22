
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guest, GuestDocument } from 'src/guests/schemas/guest.schema';
import { RoomsService } from 'src/rooms/rooms.service';
import { GuestsService } from '../guests/guests.service';
import { Room, RoomDocument } from '../rooms/schemas/room.schema';
import { RoomStatus } from '../types';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private guestsService: GuestsService,
     @InjectModel(Guest.name) private guestModel: Model<GuestDocument>,
  private roomsService: RoomsService,
  
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

 async createPublicBooking(bookingData: any) {
  const { roomId, guestName, email, phone, checkIn, checkOut, numberOfGuests, specialRequests } = bookingData;

  const [firstName, ...lastNameParts] = guestName.trim().split(' ');
  const lastName = lastNameParts.join(' ') || '';

  const room = await this.roomModel.findById(roomId);
  if (!room || room.status !== RoomStatus.Available) {
    throw new BadRequestException('Room is not available');
  }

  // Create guest
  const guest = new this.guestModel({
    firstName,
    lastName,
    email,
    phone,
  });
  await guest.save();

  // Calculate nights and totalCost
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(diffTime / (1000 * 3600 * 24));
  if (nights <= 0) {
    throw new BadRequestException('Check-out date must be after check-in date.');
  }
  const totalCost = nights * room.pricePerNight;

  // Create booking with required fields
  const booking = new this.bookingModel({
    room: room._id,
    guest: guest._id,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    totalCost,
    specialRequests,
    status: 'Confirmed',
  });

  await booking.save();

  // Update room status
  room.status = RoomStatus.Booked;
  await room.save();

  return booking;
}


}