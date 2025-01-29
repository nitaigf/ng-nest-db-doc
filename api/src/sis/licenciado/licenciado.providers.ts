// sis/licenciado/licenciado.providers.ts

import { DataSource } from 'typeorm';
import { Licenciado } from './licenciado.entity';

export const LICENCIADO_REPOSITORY = Symbol('LICENCIADO_REPOSITORY');

export const licenciadoProviders = [
  {
    provide: LICENCIADO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Licenciado),
    inject: ['DATA_SOURCE'],
  },
];
