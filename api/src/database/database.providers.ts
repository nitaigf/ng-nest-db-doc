// api/src/database/database.providers.ts

import configuration from 'src/config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dbConfig = configuration().database;

      const dataSourceOptions: DataSourceOptions = {
        // type: dbConfig.type as any,
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'production',
      };

      const dataSource = new DataSource(dataSourceOptions);

      return dataSource.initialize();
    },
  },
];
