// api/src/tabela/tabela.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  ColumnInfo,
  PrimaryKeyInfo,
  ForeignKeyInfo,
  IndexInfo,
  CheckConstraintInfo,
  TableCommentInfo,
} from './interfaces/tabelas-response.interface';
import getTableStructureSQL from './sql/getTableStructure.sql';
import getPrimaryKeysSQL from './sql/getPrimaryKeys.sql';
import getUniqueKeysSQL from './sql/getUniqueKeys.sql';
import getTableIndexesSQL from './sql/getTableIndexes.sql';
import getForeignKeysSQL from './sql/getForeignKeys.sql';
import getCheckConstraintsSQL from './sql/getCheckConstraints.sql';
import getTableCommentSQL from './sql/getTableComment.sql';

@Injectable()
export class TabelaService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  // Função para obter a estrutura da tabela (colunas)
  async getTableStructure(
    tableName: string,
    schema: string = 'public',
  ): Promise<ColumnInfo[]> {
    const sql = getTableStructureSQL;
    const result = await this.dataSource.query(sql, [schema, tableName]);
    return result.map((row: any) => ({
      column_name: row.column_name,
      data_type: row.data_type,
      column_comment: row.column_comment,
    }));
  }

  // Função para obter as chaves primárias da tabela
  async getPrimaryKeys(
    tableName: string,
    schema: string = 'public',
  ): Promise<PrimaryKeyInfo[]> {
    const sql = getPrimaryKeysSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    const grouped: Record<string, PrimaryKeyInfo> = {};

    rows.forEach((row: any) => {
      if (!grouped[row.constraint_name]) {
        grouped[row.constraint_name] = {
          constraint_name: row.constraint_name,
          column_names: [],
          data_types: [],
          column_comments: [],
        };
      }
      grouped[row.constraint_name].column_names.push(row.column_name);
      grouped[row.constraint_name].data_types.push(row.data_type);
      grouped[row.constraint_name].column_comments.push(row.column_comment);
    });

    return Object.values(grouped);
  }

  // Função para obter as chaves únicas (Unique Keys) da tabela
  async getUniqueKeys(
    tableName: string,
    schema: string = 'public',
  ): Promise<PrimaryKeyInfo[]> {
    const sql = getUniqueKeysSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    const grouped: Record<string, PrimaryKeyInfo> = {};

    rows.forEach((row: any) => {
      if (!grouped[row.constraint_name]) {
        grouped[row.constraint_name] = {
          constraint_name: row.constraint_name,
          column_names: [],
          data_types: [],
          column_comments: [],
        };
      }
      grouped[row.constraint_name].column_names.push(row.column_name);
      grouped[row.constraint_name].data_types.push(row.data_type);
      grouped[row.constraint_name].column_comments.push(row.column_comment);
    });

    return Object.values(grouped);
  }

  // Função para obter os índices da tabela
  async getTableIndexes(
    tableName: string,
    schema: string = 'public',
  ): Promise<IndexInfo[]> {
    const sql = getTableIndexesSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    return rows.map((row: any) => ({
      index_name: row.index_name,
      is_unique: row.is_unique,
      is_primary: row.is_primary,
      column_names: row.column_names,
      index_type: row.index_type,
      index_comment: row.index_comment,
    }));
  }

  // Função para obter as chaves estrangeiras da tabela
  async getForeignKeys(
    tableName: string,
    schema: string = 'public',
  ): Promise<ForeignKeyInfo[]> {
    const sql = getForeignKeysSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    const grouped: Record<string, ForeignKeyInfo> = {};

    rows.forEach((row: any) => {
      if (!grouped[row.constraint_name]) {
        grouped[row.constraint_name] = {
          constraint_name: row.constraint_name,
          column_names: [],
          foreign_table_name: row.foreign_table_name,
          foreign_column_names: [],
          constraint_comment: row.constraint_comment,
        };
      }
      grouped[row.constraint_name].column_names.push(row.column_name);
      grouped[row.constraint_name].foreign_column_names.push(
        row.foreign_column_name,
      );
    });

    return Object.values(grouped);
  }

  // Função para obter as restrições de check da tabela
  async getCheckConstraints(
    tableName: string,
    schema: string = 'public',
  ): Promise<CheckConstraintInfo[]> {
    const sql = getCheckConstraintsSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    return rows.map((row: any) => ({
      constraint_name: row.constraint_name,
      check_definition: row.check_definition,
      constraint_comment: row.constraint_comment,
    }));
  }

  // Função para obter o comentário da tabela
  async getTableComment(
    tableName: string,
    schema: string = 'public',
  ): Promise<TableCommentInfo> {
    const sql = getTableCommentSQL;
    const rows = await this.dataSource.query(sql, [schema, tableName]);

    return {
      tableComment: rows[0]?.tableComment || null,
    };
  }
}
