"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const rooms_module_1 = require("./rooms/rooms.module");
const public_module_1 = require("./public/public.module");
const gemini_service_1 = require("./gemini.service");
const bookings_module_1 = require("./bookings/bookings.module");
const guests_module_1 = require("./guests/guests.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const ai_module_1 = require("./ai/ai.module");
const reports_module_1 = require("./reports/reports.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const uri = configService.get('MONGO_URI');
                    if (!uri) {
                        throw new common_1.BadRequestException('MONGO_URI environment variable is not set. Please provide a valid MongoDB connection string.');
                    }
                    return { uri };
                },
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
            public_module_1.PublicModule,
            bookings_module_1.BookingsModule,
            guests_module_1.GuestsModule,
            dashboard_module_1.DashboardModule,
            ai_module_1.AiModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [],
        providers: [gemini_service_1.GeminiService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map