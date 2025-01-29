// app/src/app/ngfdbdoc/tabelas/tabelas.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiResponse, CheckConstraintInfo, ColumnInfo, ForeignKeyInfo, IndexInfo, PrimaryKeyInfo, TableComment } from './tabelas-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TabelasService } from './tabelas.service';

@Component({
    templateUrl: './tabelas.component.html',
    styleUrls: ['./tabelas.component.scss'],
    standalone: false,
})
export class TabelasComponent implements OnInit {
    loading: boolean = false;
    searchTableName: string = '';
    searchError: string = '';
    public useDropdowns: boolean = false;

    schemas: string[] = [];
    modules: { [schema: string]: string[] } = {};
    tables: { [schema: string]: { [module: string]: string[] } } = {};

    filteredModules: string[] = [];
    filteredTables: string[] = [];

    selectedSchema: string | null = null;
    selectedModule: string | null = null;

    apiResponse: ApiResponse = {
        tableName: '',
        tableComment: null,
        columns: [],
        primaryKeys: [],
        foreignKeys: [],
        indexes: [],
        checks: [],
        error: '',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tableService: TabelasService
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const name = params.get('tableName');
            if (name) {
                this.searchTableName = name;
                this.fetchData();
            }
        });

        this.loadTableData();
    }

    fetchData(): void {
        if (!this.searchTableName) return;

        this.loading = true;
        this.searchError = '';

        this.tableService.getTabelas(this.searchTableName).subscribe({
            next: (data: ApiResponse) => {
                this.apiResponse = data;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.searchError =
                    err.error?.error ||
                    'Não foi possível carregar os dados da tabela. Tente novamente mais tarde.';
                this.loading = false;
            },
        });
    }

    reloadData(): void {
        if (this.searchTableName) {
            this.router
                .navigate(['/tabelas', this.searchTableName])
                .then(() => {
                    this.fetchData();
                });
        }
    }

    columnCommentTemplate(comment: string | null): {
        commentText: string;
        sample?: string;
    } {
        if (!comment) return { commentText: '' };

        try {
            const parsedComment = JSON.parse(comment);
            return {
                commentText: parsedComment.comment,
                sample: parsedComment.sample
                    ? JSON.stringify(parsedComment.sample, null, 2)
                    : undefined,
            };
        } catch (err) {
            console.error('Erro ao parsear comentário da coluna:', err);
            return { commentText: comment };
        }
    }

    loadTableData(): void {
        this.tableService.getTabelasList().subscribe((data) => {
            const schemaSet = new Set<string>();
            const moduleMap: { [schema: string]: Set<string> } = {};
            const tableMap: {
                [schema: string]: { [module: string]: Set<string> };
            } = {};

            data.forEach((item) => {
                schemaSet.add(item.schema);

                if (!moduleMap[item.schema]) {
                    moduleMap[item.schema] = new Set<string>();
                }
                moduleMap[item.schema].add(item.module);

                if (!tableMap[item.schema]) {
                    tableMap[item.schema] = {};
                }
                if (!tableMap[item.schema][item.module]) {
                    tableMap[item.schema][item.module] = new Set<string>();
                }
                tableMap[item.schema][item.module].add(item.table);
            });

            this.schemas = Array.from(schemaSet);
            this.modules = {};
            this.tables = {};

            Object.keys(moduleMap).forEach((schema) => {
                this.modules[schema] = Array.from(moduleMap[schema]);
            });

            Object.keys(tableMap).forEach((schema) => {
                this.tables[schema] = {};
                Object.keys(tableMap[schema]).forEach((module) => {
                    this.tables[schema][module] = Array.from(
                        tableMap[schema][module]
                    );
                });
            });
        });
    }

    filterModules(): void {
        if (this.selectedSchema) {
            this.filteredModules = this.modules[this.selectedSchema] || [];
            this.selectedModule = null;
            this.filteredTables = [];
            this.searchTableName = '';
        } else {
            this.filteredModules = [];
        }
    }

    filterTables(): void {
        if (this.selectedSchema && this.selectedModule) {
            this.filteredTables =
                this.tables[this.selectedSchema][this.selectedModule] || [];
            this.searchTableName = '';
        } else {
            this.filteredTables = [];
        }
    }
}
