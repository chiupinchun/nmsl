import { Test, TestingModule } from '@nestjs/testing';
import { calendarController } from './calendar.controller';
import { calendarService } from './calendar.service';

describe('calendarController', () => {
  let controller: calendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [calendarController],
      providers: [calendarService],
    }).compile();

    controller = module.get<calendarController>(calendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
