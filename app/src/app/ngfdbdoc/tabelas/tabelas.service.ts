// app/src/app/ngfdbdoc/tabelas/tabelas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './tabelas-response.model';

@Injectable({
    providedIn: 'root',
})
export class TabelasService {
    constructor(private http: HttpClient) {}

    getTabelas(tableName: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`/api/tabela/${tableName}`);
    }

    getTabelasList(): Observable<{ schema: string; module: string; table: string }[]> {
        return this.http.get<{ schema: string; module: string; table: string }[]>('/api/info');
    }
}
