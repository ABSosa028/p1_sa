import { Test, TestingModule } from '@nestjs/testing';
import { HistorialComentarioController } from './historial-comentario.controller';
import { HistorialComentarioService } from './historial-comentario.service';

describe('HistorialComentarioController', () => {
  let controller: HistorialComentarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialComentarioController],
      providers: [HistorialComentarioService],
    }).compile();

    controller = module.get<HistorialComentarioController>(HistorialComentarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
