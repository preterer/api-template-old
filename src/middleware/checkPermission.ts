import { NextFunction, Request, Response } from "express-serve-static-core";
import { Container } from "typedi";

import { PermissionService } from "@preterer/auth";

/**
 * Middleware that checks user permission with entity
 *
 * @export
 * @param {string} permission
 * @param {string} entityType
 * @param {(string | string[])} idPath
 * @returns
 */
export function checkPermission(permission: string, entityType: string, idPath: string | string[]) {
  const permissionService = Container.get(PermissionService);

  if (!Array.isArray(idPath)) {
    idPath = idPath.split(".");
  }

  return async (request: Request, response: Response, next?: NextFunction): Promise<void | Response> => {
    const entityId = (idPath as string[]).reduce((obj, key) => obj[key], request);
    const user = (request as any).user;
    const hasPermission = await permissionService.check(
      user && user.id,
      permission,
      entityId && entityId.toString(),
      entityType
    );
    if (hasPermission) {
      return next();
    }
    return response.sendStatus(403);
  };
}
