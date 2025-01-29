// api/src/tabela/tabela.controller.ts

import {
  Controller,
  Get,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly tabelaService: InfoService) {}

  @Get()
  async getTableList(): Promise<{schema: string, module: string, table: string}[]> {
    try {
      return this.tabelaService.getTableList();
    } catch (error) {
      console.error('Erro na rota da API:', error);
      throw new InternalServerErrorException(
        'Falha ao carregar os dados do banco de dados.',
      );
    }
  }
}
