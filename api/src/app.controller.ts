// app.controller.ts

import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

interface HelloResponse {
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getHello(): Promise<HelloResponse> {
    return this.appService.getHello();
  }
}
