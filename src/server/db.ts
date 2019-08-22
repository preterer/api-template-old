import * as TypeORM from "typeorm";
import { Container } from "typedi";

import { User, Role, Permission } from "@preterer/auth";

import { Config } from "../config/config";
import { Fundraiser } from "../entities/fundraiser.entity";

/**
 * Connects to applications database
 *
 * @export
 * @returns {Promise<void>}
 */
export async function connectDB(): Promise<void> {
  TypeORM.useContainer(Container);
  await TypeORM.createConnection(connectionConfig());
}

/**
 * Creates connection config
 *
 * @returns {TypeORM.ConnectionOptions}
 */
function connectionConfig(): TypeORM.ConnectionOptions {
  const config = Container.get(Config);

  return {
    type: config.db.type as any,
    database: config.db.name,
    username: config.db.user,
    password: config.db.password,
    port: config.db.port,
    host: config.db.host,
    synchronize: config.db.synchronize,
    dropSchema: config.db.dropSchema,
    logging: config.db.logging,
    cache: config.db.cache,
    entities: entities()
  };
}

/**
 * Returns list of entities
 *
 * @returns {((Function | string)[])}
 */
function entities(): (Function | string)[] {
  return ["dist/entities/**/*.js", Permission, Role, User];
}
