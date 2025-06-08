import { Test, TestingModule } from '@nestjs/testing';
import { HistorialComentarioService } from './historial-comentario.service';

describe('HistorialComentarioService', () => {
  let service: HistorialComentarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialComentarioService],
    }).compile();

    service = module.get<HistorialComentarioService>(HistorialComentarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
