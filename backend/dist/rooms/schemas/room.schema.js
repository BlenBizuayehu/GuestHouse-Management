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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.Room = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("../../types");
let Amenities = class Amenities {
};
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "has_air_conditioning", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "has_tv", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "has_minibar", void 0);
Amenities = __decorate([
    (0, mongoose_1.Schema)()
], Amenities);
const AmenitiesSchema = mongoose_1.SchemaFactory.createForClass(Amenities);
let Room = class Room {
};
exports.Room = Room;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Room.prototype, "number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(types_1.RoomType) }),
    __metadata("design:type", String)
], Room.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(types_1.RoomStatus), default: types_1.RoomStatus.Available }),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Room.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Room.prototype, "pricePerNight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: AmenitiesSchema, default: () => ({}) }),
    __metadata("design:type", Amenities)
], Room.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Room.prototype, "images", void 0);
exports.Room = Room = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Room);
exports.RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
//# sourceMappingURL=room.schema.js.map