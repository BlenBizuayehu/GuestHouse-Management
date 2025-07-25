"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const rooms_module_1 = require("../rooms/rooms.module");
const bookings_module_1 = require("../bookings/bookings.module");
const room_schema_1 = require("../rooms/schemas/room.schema");
const public_controller_1 = require("./public.controller");
let PublicModule = class PublicModule {
};
exports.PublicModule = PublicModule;
exports.PublicModule = PublicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: room_schema_1.Room.name, schema: room_schema_1.RoomSchema }]),
            bookings_module_1.BookingsModule,
            rooms_module_1.RoomsModule
        ],
        controllers: [public_controller_1.PublicController],
    })
], PublicModule);
//# sourceMappingURL=public.module.js.map