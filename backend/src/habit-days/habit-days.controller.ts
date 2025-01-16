import { Controller, Patch, UseGuards } from '@nestjs/common';
import { HabitDaysService } from './habit-days.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('habit-days')
@UseGuards(AuthGuard)
export class HabitDaysController {
  constructor(private habitDaysService: HabitDaysService) {}

  @Patch(':id/note')
  updateHabitDayNote() {}
}
