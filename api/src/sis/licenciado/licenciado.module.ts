// sis/licenciado/licenciado.module.ts

import { Module } from '@nestjs/common';
import { LicenciadoService } from './licenciado.service';
import { licenciadoProviders } from './licenciado.providers';
import { DatabaseModule } from 'src/database/database.module';
import { LicenciadoRepository } from './licenciado.repository';

@Module({
  imports: [DatabaseModule],
  providers: [...licenciadoProviders, LicenciadoRepository, LicenciadoService],
  exports: [LicenciadoService],
})
export class LicenciadoModule {}
