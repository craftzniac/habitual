import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
config();

const typeormConfig: Partial<DataSourceOptions> =
  process.env.NODE_ENV === 'development'
    ? {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
      }
    : {
        url: process.env.DB_URL,
      };

export const dataSourceOptions: DataSourceOptions = {
  ...typeormConfig,
  type: 'postgres' as const,
  useUTC: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
