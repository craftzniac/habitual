import { Test, TestingModule } from '@nestjs/testing';
import { HabitDaysService } from './habit-days.service';

describe('HabitDaysService', () => {
  let service: HabitDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitDaysService],
    }).compile();

    service = module.get<HabitDaysService>(HabitDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
