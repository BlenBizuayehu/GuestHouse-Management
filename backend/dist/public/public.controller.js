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
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("../bookings/bookings.service");
const rooms_service_1 = require("../rooms/rooms.service");
let PublicController = class PublicController {
    constructor(roomsService, bookingsService) {
        this.roomsService = roomsService;
        this.bookingsService = bookingsService;
    }
    async findAllRooms() {
        return this.roomsService.findAllPublic();
    }
    async findOneRoom(id) {
        return this.roomsService.findOnePublic(id);
    }
    async createBooking(bookingData) {
        return this.bookingsService.createPublicBooking(bookingData);
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllRooms", null);
__decorate([
    (0, common_1.Get)('rooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findOneRoom", null);
__decorate([
    (0, common_1.Post)('bookings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "createBooking", null);
exports.PublicController = PublicController = __decorate([
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService,
        bookings_service_1.BookingsService])
], PublicController);
//# sourceMappingURL=public.controller.js.map