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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const gemini_service_1 = require("../gemini.service");
const ai_dto_1 = require("../ai.dto");
let AiController = class AiController {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async summarizeReviews(body) {
        const summary = await this.geminiService.summarizeReviews(body.reviews);
        return { summary };
    }
    async generateWelcomeMessage(body) {
        const message = await this.geminiService.generateWelcomeMessage(body.guestName, body.bookingDetails);
        return { message };
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('summarize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.SummarizeReviewsDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "summarizeReviews", null);
__decorate([
    (0, common_1.Post)('generate-welcome'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_dto_1.GenerateWelcomeDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateWelcomeMessage", null);
exports.AiController = AiController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map