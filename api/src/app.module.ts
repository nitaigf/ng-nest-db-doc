// app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { configValidationSchema } from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LicenciadoModule } from './sis/licenciado/licenciado.module';
import { DatabaseModule } from './database/database.module';
import { TabelaModule } from './tabela/tabela.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    DatabaseModule,
    LicenciadoModule,
    TabelaModule,
    InfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
