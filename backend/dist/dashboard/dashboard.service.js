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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_schema_1 = require("../rooms/schemas/room.schema");
const booking_schema_1 = require("../bookings/schemas/booking.schema");
const types_1 = require("../types");
let DashboardService = class DashboardService {
    constructor(roomModel, bookingModel) {
        this.roomModel = roomModel;
        this.bookingModel = bookingModel;
    }
    async getDashboardStats() {
        const totalRooms = await this.roomModel.countDocuments().exec();
        const availableRooms = await this.roomModel.countDocuments({ status: types_1.RoomStatus.Available }).exec();
        const occupiedRooms = await this.roomModel.countDocuments({ status: types_1.RoomStatus.Occupied }).exec();
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
        const recentCheckIns = await this.bookingModel.find({
            status: 'CheckedIn',
            updatedAt: { $gte: startOfToday }
        }).populate('room', 'number').sort({ updatedAt: -1 }).limit(2).exec();
        const upcomingCheckOuts = await this.bookingModel.find({
            status: { $in: ['CheckedIn', 'Confirmed'] },
            checkOutDate: { $gte: startOfToday, $lte: endOfToday }
        }).populate('room', 'number').sort({ checkOutDate: 1 }).limit(2).exec();
        return {
            totalRooms,
            availableRooms,
            occupiedRooms,
            currentGuests,
            recentCheckIns,
            upcomingCheckOuts,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map