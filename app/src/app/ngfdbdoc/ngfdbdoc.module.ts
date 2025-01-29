import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgfdbdocRoutingModule } from './ngfdbdoc-routing.module';
import { HomeComponent } from './home/home.component';
import { TabelasComponent } from './tabelas/tabelas.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        TabelasComponent,
    ],
    imports: [
        NgfdbdocRoutingModule,
        SharedModule,
    ],
})
export class NgfdbdocModule {}
