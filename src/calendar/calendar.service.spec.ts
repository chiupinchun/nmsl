import { Test, TestingModule } from '@nestjs/testing';
import { calendarService } from './calendar.service';

describe('calendarService', () => {
  let service: calendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [calendarService],
    }).compile();

    service = module.get<calendarService>(calendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
