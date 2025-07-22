"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomType = exports.RoomStatus = void 0;
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["Available"] = "Available";
    RoomStatus["Occupied"] = "Occupied";
    RoomStatus["Cleaning"] = "Cleaning";
    RoomStatus["Maintenance"] = "Maintenance";
    RoomStatus["Booked"] = "Booked";
})(RoomStatus || (exports.RoomStatus = RoomStatus = {}));
var RoomType;
(function (RoomType) {
    RoomType["Single"] = "Single";
    RoomType["Double"] = "Double";
    RoomType["Suite"] = "Suite";
    RoomType["Family"] = "Family";
})(RoomType || (exports.RoomType = RoomType = {}));
//# sourceMappingURL=types.js.map