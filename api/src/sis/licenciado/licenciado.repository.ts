import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { LICENCIADO_REPOSITORY } from './licenciado.providers';
import { Licenciado } from './licenciado.entity';

@Injectable()
export class LicenciadoRepository {
  constructor(
    @Inject(LICENCIADO_REPOSITORY)
    private readonly repository: Repository<Licenciado>,
  ) {}

  async findAll(): Promise<Licenciado[]> {
    const licenciados = await this.repository.find();
    console.log(licenciados);
    return licenciados;
  }
}
