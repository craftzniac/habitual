import { Controller, Delete, Param } from '@nestjs/common';
import { HabitDaysService } from './habit-days.service';

@Controller('habit-days')
export class HabitDaysController {
  constructor(private habitDaysService: HabitDaysService) { }

  @Delete(':id')
  async delete(@Param('id') habitId: string) {
    return this.habitDaysService.delete(habitId);
  }
}
