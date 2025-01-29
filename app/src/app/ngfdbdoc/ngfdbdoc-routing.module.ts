import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TabelasComponent } from './tabelas/tabelas.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: HomeComponent },
            { path: 'tabelas', component: TabelasComponent },
            { path: 'tabelas/:tableName', component: TabelasComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class NgfdbdocRoutingModule {}
