import bodyParser from "body-parser";
import express, { Express } from "express";
import { Action, RoutingControllersOptions, useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";

import { authMiddleware, checkAccess, JWTPayload, useAuthStrategy } from "@preterer/auth";

import { controllers } from "../controllers/controllers";
import { logRequests } from "./logger";

/**
 * Starts application server
 *
 * @export
 */
export function startServer(): void {
  const app = express();
  app.use(bodyParser.json());
  app.use(logRequests);

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
    defaultErrorHandler: false,
    currentUserChecker: getCurrentUser,
    authorizationChecker: checkPermissions,

    controllers: controllers()
  };
  useExpressServer(app, routingControllersOptions);
}

/**
 * Gets current user JWT payload
 *
 * @param {Action} action
 * @returns {JWTPayload}
 */
function getCurrentUser(action: Action): JWTPayload {
  return action.request.user;
}

/**
 * Checks user permissions
 *
 * @param {Action} action
 * @param {string[]} permissions
 * @returns {Promise<boolean>}
 */
function checkPermissions(action: Action, permissions: string[]): Promise<boolean> {
  return checkAccess(action.request.user, permissions);
}
