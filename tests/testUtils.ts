import * as TypeORM from "typeorm";
import { Container } from "typedi";

import { Fundraiser } from "../src/entities/fundraiser.entity";

/**
 * Mocks in memory DB
 *
 * @export
 * @returns
 */
export function mockDB(): Promise<TypeORM.Connection> {
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
