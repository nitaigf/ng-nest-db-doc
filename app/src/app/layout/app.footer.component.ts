import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { AppService } from '../app.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    standalone: false
})
export class AppFooterComponent implements OnInit {
    message: string;

    constructor(
        private appService: AppService,
        public layoutService: LayoutService
    ) { }

    ngOnInit() {
        this.appService.getHelloMessageFromApi().subscribe((data: string) => {
            this.message = JSON.parse(data)['message'];
        });
    }
}
