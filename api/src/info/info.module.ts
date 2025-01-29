// api/src/tabela/tabela.module.ts

import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
