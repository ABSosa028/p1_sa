import { Test, TestingModule } from '@nestjs/testing';
import { PersonalLibreryService } from './personal-librery.service';

describe('PersonalLibreryService', () => {
  let service: PersonalLibreryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalLibreryService],
    }).compile();

    service = module.get<PersonalLibreryService>(PersonalLibreryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
