import { DataSource, DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES || ''],
  migrations: [process.env.TYPEORM_MIGRATIONS || ''],
};

const dataSource = new DataSource(ormConfig);

async function initializeDataSource() {
  try {
    await dataSource.initialize();
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
}

initializeDataSource();

export default dataSource;