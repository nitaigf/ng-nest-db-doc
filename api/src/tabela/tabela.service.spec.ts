import { Test, TestingModule } from '@nestjs/testing';
import { TabelaService } from './tabela.service';

describe('TabelaService', () => {
  let service: TabelaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TabelaService],
    }).compile();

    service = module.get<TabelaService>(TabelaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
