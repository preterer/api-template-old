import "reflect-metadata";

import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

import { connectDB } from "./server/db";
import { configureLogger } from "./server/logger";
import { startServer } from "./server/server";

/**
 * Bootstraps the application
 *
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  configureLogger();
  await connectDB();
  startServer();
}

bootstrap();
