import { Test, TestingModule } from '@nestjs/testing';
import { LicenciadoService } from './licenciado.service';

describe('LicenciadoService', () => {
  let service: LicenciadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenciadoService],
    }).compile();

    service = module.get<LicenciadoService>(LicenciadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
