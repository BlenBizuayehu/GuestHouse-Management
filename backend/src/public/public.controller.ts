// backend/src/public/public.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';
import { RoomsService } from '../rooms/rooms.service';

@Controller('public')
export class PublicController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly bookingsService: BookingsService
  ) {}

  @Get('rooms')
  async findAllRooms() {
    return this.roomsService.findAllPublic();
  }

  @Get('rooms/:id')
  async findOneRoom(@Param('id') id: string) {
    return this.roomsService.findOnePublic(id);
  }

  @Post('bookings')
  async createBooking(@Body() bookingData: any) {
    return this.bookingsService.createPublicBooking(bookingData);
  }
}