// api/src/tabela/tabela.controller.ts

import {
  Controller,
  Get,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TabelaService } from './tabela.service';
import { ApiResponse } from './interfaces/tabelas-response.interface';

@Controller('tabela')
export class TabelaController {
  constructor(private readonly tabelaService: TabelaService) {}

  @Get(':tableName')
  async getTableDocumentation(
    @Param('tableName') tableName: string,
  ): Promise<ApiResponse> {
    const schema = 'public'; // Ajuste conforme necessário

    // Validação simples
    const validTableName = /^[A-Za-z0-9_]+$/.test(tableName);
    if (!validTableName) {
      throw new BadRequestException('Nome da tabela inválido.');
    }

    try {
      const [columns, primaryKeys, foreignKeys, indexes, checks, tableComment] =
        await Promise.all([
          this.tabelaService.getTableStructure(tableName, schema),
          this.tabelaService.getPrimaryKeys(tableName, schema),
          this.tabelaService.getForeignKeys(tableName, schema),
          this.tabelaService.getTableIndexes(tableName, schema),
          this.tabelaService.getCheckConstraints(tableName, schema),
          this.tabelaService.getTableComment(tableName, schema),
        ]);

      return {
        tableName,
        tableComment: tableComment?.tableComment as string,
        responsability: {
          system: tableComment?.responsability?.system as boolean,
          user: tableComment?.responsability?.user as boolean,
        },
        columns,
        primaryKeys,
        foreignKeys,
        indexes,
        checks,
      };
    } catch (error) {
      console.error('Erro na rota da API:', error);
      throw new InternalServerErrorException(
        'Falha ao carregar os dados da tabela.',
      );
    }
  }
}
