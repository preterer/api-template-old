import Container from "typedi";

import { User, UserService, Permission, PermissionService, Role, RoleService } from "@preterer/auth";

/**
 * Mocks a permission
 *
 * @export
 * @param {string} [name="Test"]
 * @returns {Promise<Permission>}
 */
export function mockPermission(name = "Test", userId?: number, roleId?: number): Promise<Permission> {
  return Container.get(PermissionService).add({ name, userId, roleId });
}

/**
 * Mocks a role
 *
 * @export
 * @param {string} [name="Test"]
 * @returns {Promise<Role>}
 */
export function mockRole(name = "Test"): Promise<Role> {
  return Container.get(RoleService).add({ name, parentId: 1 });
}

/**
 * Mocks an user
 *
 * @export
 * @param {string} [login="test"]
 * @returns {Promise<User>}
 */
export function mockUser(login = "test"): Promise<User> {
  return Container.get(UserService).add({ login, password: "test" });
}
