import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
