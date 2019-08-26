import * as TypeORM from "typeorm";
import { Container } from "typedi";

import { User, UserService, Permission, PermissionService, Role, RoleService } from "@preterer/auth";

/**
 * Mocks a permission
 *
 * @export
 * @param {string} [name="Test"]
 * @returns {Promise<Permission>}
 */
export function mockPermission(
  name = "Test",
  userId?: number,
  roleId?: number,
  entityId?: string,
  entityType?: string
): Promise<Permission> {
  return Container.get(PermissionService).add({ name, userId, roleId, entityId, entityType });
}

/**
 * Mocks required root role
 *
 * @returns {Promise<Role>}
 */
function mockRootRole(): Promise<Role> {
  const roleRepository = TypeORM.getRepository(Role);
  const role = roleRepository.create({ name: "Root" });
  return roleRepository.save(role);
}

/**
 * Mocks a role
 *
 * @export
 * @param {string} [name="Test"]
 * @returns {Promise<Role>}
 */
export async function mockRole(name = "Test"): Promise<Role> {
  const roleService = Container.get(RoleService);
  const rootRole = (await roleService.getRoot()) || (await mockRootRole());
  return roleService.add({ name, parentId: rootRole.id });
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
