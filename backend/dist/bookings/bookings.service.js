"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const guest_schema_1 = require("../guests/schemas/guest.schema");
const rooms_service_1 = require("../rooms/rooms.service");
const guests_service_1 = require("../guests/guests.service");
const room_schema_1 = require("../rooms/schemas/room.schema");
const types_1 = require("../types");
const booking_schema_1 = require("./schemas/booking.schema");
let BookingsService = class BookingsService {
    constructor(bookingModel, roomModel, guestsService, guestModel, roomsService) {
        this.bookingModel = bookingModel;
        this.roomModel = roomModel;
        this.guestsService = guestsService;
        this.guestModel = guestModel;
        this.roomsService = roomsService;
    }
    async create(createBookingDto) {
        const { guest: guestDto, roomId, checkInDate, checkOutDate, numberOfGuests } = createBookingDto;
        const guest = await this.guestsService.findOrCreate(guestDto);
        const room = await this.roomModel.findById(roomId).exec();
        if (!room) {
            throw new common_1.NotFoundException(`Room with ID "${roomId}" not found`);
        }
        if (room.status !== types_1.RoomStatus.Available) {
            throw new common_1.BadRequestException('The selected room is not available for booking.');
        }
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
        if (nights <= 0) {
            throw new common_1.BadRequestException('Check-out date must be after check-in date.');
        }
        const totalCost = nights * room.pricePerNight;
        const createdBooking = new this.bookingModel({
            guest: guest._id,
            room: room._id,
            checkInDate,
            checkOutDate,
            numberOfGuests,
            totalCost,
            status: 'Confirmed',
        });
        room.status = types_1.RoomStatus.Occupied;
        await room.save();
        return createdBooking.save();
    }
    async findAll() {
        return this.bookingModel
            .find()
            .populate('guest')
            .populate('room')
            .sort({ checkInDate: -1 })
            .exec();
    }
    async createPublicBooking(bookingData) {
        const { roomId, guestName, email, phone, checkIn, checkOut, numberOfGuests, specialRequests } = bookingData;
        const [firstName, ...lastNameParts] = guestName.trim().split(' ');
        const lastName = lastNameParts.join(' ') || '';
        const room = await this.roomModel.findById(roomId);
        if (!room || room.status !== types_1.RoomStatus.Available) {
            throw new common_1.BadRequestException('Room is not available');
        }
        const guest = new this.guestModel({
            firstName,
            lastName,
            email,
            phone,
        });
        await guest.save();
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const diffTime = checkOutDate.getTime() - checkInDate.getTime();
        const nights = Math.ceil(diffTime / (1000 * 3600 * 24));
        if (nights <= 0) {
            throw new common_1.BadRequestException('Check-out date must be after check-in date.');
        }
        const totalCost = nights * room.pricePerNight;
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
        room.status = types_1.RoomStatus.Booked;
        await room.save();
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(3, (0, mongoose_1.InjectModel)(guest_schema_1.Guest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        guests_service_1.GuestsService,
        mongoose_2.Model,
        rooms_service_1.RoomsService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map