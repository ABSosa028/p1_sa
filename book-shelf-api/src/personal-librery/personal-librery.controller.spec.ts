import { Test, TestingModule } from '@nestjs/testing';
import { PersonalLibreryController } from './personal-librery.controller';
import { PersonalLibreryService } from './personal-librery.service';

describe('PersonalLibreryController', () => {
  let controller: PersonalLibreryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalLibreryController],
      providers: [PersonalLibreryService],
    }).compile();

    controller = module.get<PersonalLibreryController>(PersonalLibreryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
