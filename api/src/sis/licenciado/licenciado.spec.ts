import { Test, TestingModule } from '@nestjs/testing';
import { Licenciado } from './licenciado.providers';

describe('Licenciado', () => {
  let provider: Licenciado;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Licenciado],
    }).compile();

    provider = module.get<Licenciado>(Licenciado);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
