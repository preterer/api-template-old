import * as TypeORM from "typeorm";
import { Container } from "typedi";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

import { User, Role, Permission } from "@preterer/auth";

/**
 * Mocks in memory DB
 *
 * @export
 * @returns
 */
export async function mockDB(): Promise<void> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  TypeORM.useContainer(Container);
  await TypeORM.createConnection({
    type: "sqljs",
    entities: ["./src/entities/**/*.ts", Permission, Role, User],
    logger: "advanced-console",
    logging: ["error"],
    dropSchema: true,
    synchronize: true,
    cache: false
  });
}

/**
 * Clears database
 *
 * @export
 * @returns {Promise<void>}
 */
export async function clearDB(): Promise<void> {
  await Promise.all([Permission, Role, User].map(entity => TypeORM.getManager().clear(entity)));
}
