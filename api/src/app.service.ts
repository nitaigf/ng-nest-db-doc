// app.service.ts

import { Injectable } from '@nestjs/common';
import { LicenciadoService } from './sis/licenciado/licenciado.service';

interface HelloResponse {
  message: string;
}

@Injectable()
export class AppService {
  constructor(private readonly licenciadoService: LicenciadoService) {}

  async getHello(): Promise<HelloResponse> {
    const licenciados = await this.licenciadoService.getAllLicenciados();
    console.log(licenciados);
    const firstSigla = licenciados.length > 0 ? licenciados[0].sigla : 'N/A';
    return { message: `Licenciado (sigla): ${firstSigla}` };
  }
}
