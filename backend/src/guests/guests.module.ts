
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestsService } from './guests.service';
import { Guest, GuestSchema } from './schemas/guest.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }])],
  providers: [GuestsService],
  exports: [GuestsService],
})
export class GuestsModule {}