import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const AppDataSourceConfig = (): DataSource => {
  const isTest = process.env.NODE_ENV === "test";
  const isProd = process.env.NODE_ENV === "prod";

  const defaultSettings: DataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    entities: [path.join(__dirname, "./entities/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/*.{js,ts}")],
  };

  if (isTest) {
    return new DataSource({
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"],
    });
  }

  if (isProd) {
    const prodSettings: DataSourceOptions = {
      ...defaultSettings,
      ssl: { rejectUnauthorized: false },
      logging: false,
    };

    return new DataSource(prodSettings);
  }

  return new DataSource(defaultSettings);
};

const AppDataSource = AppDataSourceConfig()

export default AppDataSource;
