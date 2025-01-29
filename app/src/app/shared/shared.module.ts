import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule, JsonPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedRoutingModule,
        FormsModule,
        JsonPipe,
        InputTextModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        FormsModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        DropdownModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        JsonPipe,
        InputTextModule,
        TableModule,
        ButtonModule,
        InputGroupModule,
        FormsModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        DropdownModule,
    ],
})
export class SharedModule {}
