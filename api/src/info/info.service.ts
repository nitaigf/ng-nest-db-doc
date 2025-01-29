// api/src/tabela/tabela.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  // Função para obter a lista de tabelas
    async getTableList(): Promise<{schema: string, module: string, table: string}[]> {
      const sql = `
      SELECT 
        schemaname as schema,
        UPPER(SPLIT_PART(tablename, '_', 1)) AS module, 
        tablename as table
      FROM pg_catalog.pg_tables 
      WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
      order by 1, 2, 3;
    `;
      const result = await this.dataSource.query(sql);
      return result;
    }
}
