import express, { Express } from "express";
import { useContainer, useExpressServer, RoutingControllersOptions } from "routing-controllers";
import { Container } from "typedi";

import { authMiddleware, useAuthStrategy } from "@preterer/auth";

/**
 * Starts application server
 *
 * @export
 */
export function startServer(): void {
  const app = express();

  setupControllers(app);

  useAuthStrategy();

  app.use(authMiddleware());
  app.listen({ port: 3000 }, () => global.log.info("Server started at localhost:3000"));
}

/**
 * Setups application controllers
 *
 * @param {Express} app
 */
function setupControllers(app: Express): void {
  useContainer(Container);
  const routingControllersOptions: RoutingControllersOptions = {
    cors: true,
    controllers: [],

    defaultErrorHandler: false
  };
  useExpressServer(app, routingControllersOptions);
}
