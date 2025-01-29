// api/src/tabela/interfaces/tabelas-response.interface.ts

export interface ColumnInfo {
  column_name: string;
  data_type: string;
  column_comment: string | null;
}

export interface PrimaryKeyInfo {
  constraint_name: string;
  column_names: string[];
  data_types: string[];
  column_comments: (string | null)[];
}

export interface ForeignKeyInfo {
  constraint_name: string;
  column_names: string[];
  foreign_table_name: string;
  foreign_column_names: string[];
  constraint_comment: string | null;
}

export interface IndexInfo {
  index_name: string;
  is_unique: boolean;
  is_primary: boolean;
  column_names: string[];
  index_type: string;
  index_comment: string | null;
}

export interface CheckConstraintInfo {
  constraint_name: string;
  check_definition: string;
  constraint_comment: string | null;
}

export interface TableCommentInfo {
  comment: string | null;
  responsability?: {
    system?: boolean;
    user?: boolean;
  };
}

export interface ApiResponse {
  tableName: string;
  tableComment: TableCommentInfo | null;
  columns: ColumnInfo[];
  primaryKeys: PrimaryKeyInfo[];
  foreignKeys: ForeignKeyInfo[];
  indexes: IndexInfo[];
  checks: CheckConstraintInfo[];
  error?: any;
}
