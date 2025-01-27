import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres' as const,
  useUTC: true,
  url: process.env.DB_URL,
  entities: ['dist/**/entity/*.js'],
  migrations: ['dist/db/migrations/*.js'],
};

console.log('datasource opts: ', dataSourceOptions);

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
