"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const guests_service_1 = require("./guests.service");
const guest_schema_1 = require("./schemas/guest.schema");
let GuestsModule = class GuestsModule {
};
exports.GuestsModule = GuestsModule;
exports.GuestsModule = GuestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: guest_schema_1.Guest.name, schema: guest_schema_1.GuestSchema }
            ]),
        ],
        providers: [guests_service_1.GuestsService],
        exports: [
            guests_service_1.GuestsService,
            mongoose_1.MongooseModule,
        ],
    })
], GuestsModule);
//# sourceMappingURL=guests.module.js.map