import { AuthController } from "./auth.controller";
import { PermissionController } from "./permission.controller";
import { RoleController } from "./role.controller";
import { UserController } from "./user.controller";

/**
 * Registers controllers
 *
 * @export
 * @returns {Function[]}
 */
export function controllers(): Function[] {
  return [AuthController, PermissionController, RoleController, UserController];
}
