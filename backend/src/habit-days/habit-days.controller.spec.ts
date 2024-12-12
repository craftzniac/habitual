import { Test, TestingModule } from '@nestjs/testing';
import { HabitDaysController } from './habit-days.controller';

describe('HabitDaysController', () => {
  let controller: HabitDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitDaysController],
    }).compile();

    controller = module.get<HabitDaysController>(HabitDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
