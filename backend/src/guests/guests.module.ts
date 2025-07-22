// guests.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsService } from './guests.service';
import { Guest, GuestSchema } from './schemas/guest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guest.name, schema: GuestSchema } // ✅ register GuestModel
    ]),
  ],
  providers: [GuestsService],
  exports: [
    GuestsService,
    MongooseModule, // ✅ export the model so BookingsModule can access it
  ],
})
export class GuestsModule {}
