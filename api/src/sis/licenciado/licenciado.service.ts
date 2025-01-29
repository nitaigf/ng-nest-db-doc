// sis/licenciado/licenciado.service.ts

import { Injectable } from '@nestjs/common';
import { LicenciadoRepository } from './licenciado.repository';

@Injectable()
export class LicenciadoService {
  constructor(private readonly licenciadoRepository: LicenciadoRepository) {}

  async getAllLicenciados() {
    const licenciados = await this.licenciadoRepository.findAll();
    console.log(licenciados);
    return licenciados;
  }
}
