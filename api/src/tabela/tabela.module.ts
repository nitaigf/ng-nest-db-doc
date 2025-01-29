// api/src/tabela/tabela.module.ts

import { Module } from '@nestjs/common';
import { TabelaController } from './tabela.controller';
import { TabelaService } from './tabela.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TabelaController],
  providers: [TabelaService],
})
export class TabelaModule {}
