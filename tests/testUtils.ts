import * as TypeORM from "typeorm";
import { Container } from "typedi";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

import { Fundraiser } from "../src/entities/fundraiser.entity";

/**
 * Mocks in memory DB
 *
 * @export
 * @returns
 */
export function mockDB(): Promise<TypeORM.Connection> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  TypeORM.useContainer(Container);
  return TypeORM.createConnection({
    type: "sqljs",
    entities: [Fundraiser],
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
  await Promise.all(TypeORM.getConnection().entityMetadatas.map(metadata => TypeORM.getManager().clear(metadata.name)));
}
