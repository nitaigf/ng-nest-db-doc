// app/src/app/ngfdbdoc/tabelas/tabelas-response.model.ts

export interface ColumnComment {
    comment: string;
    sample: string;
}

export interface ColumnInfo {
    column_name: string;
    data_type: string;
    column_comment?: string | null; // JSON string
}

export interface PrimaryKeyInfo {
    constraint_name: string;
    column_names: string[];
    data_types: string[];
    column_comments?: (string | null)[];
}

export interface ForeignKeyInfo {
    constraint_name: string;
    column_names: string[];
    foreign_table_name: string;
    foreign_column_names: string[];
    constraint_comment?: string | null;
}

export interface IndexInfo {
    index_name: string;
    is_unique: boolean;
    is_primary: boolean;
    column_names: string[];
    index_type: string;
    index_comment?: string | null;
}

export interface CheckConstraintInfo {
    constraint_name: string;
    check_definition: string;
    constraint_comment?: string | null;
}

export interface TableComment {
    comment?: string;
    responsability?: {
        system?: boolean;
        user?: boolean;
    };
}

export interface ApiResponse {
    tableName: string;
    tableComment: TableComment;
    columns: ColumnInfo[];
    primaryKeys: PrimaryKeyInfo[];
    foreignKeys: ForeignKeyInfo[];
    indexes: IndexInfo[];
    checks: CheckConstraintInfo[];
    error?: string;
}
