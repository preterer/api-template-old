import { QueryRunner } from "typeorm";

import { Role, User } from "@preterer/auth";

/**
 * Creates a role
 *
 * @export
 * @param {QueryRunner} queryRunner
 * @param {string} name
 * @param {Role} [parent]
 * @returns {Promise<Role>}
 */
export function createRole(queryRunner: QueryRunner, name: string, parent?: Role): Promise<Role> {
  const role = queryRunner.manager.create(Role, { name });
  if (parent) {
    role.parent = Promise.resolve(parent);
  }
  return queryRunner.manager.save(role);
}

/**
 * Creates an user
 *
 * @export
 * @param {QueryRunner} queryRunner
 * @param {string} login
 * @param {string} password
 * @param {Role[]} [roles]
 * @returns {Promise<User>}
 */
export async function createUser(
  queryRunner: QueryRunner,
  login: string,
  password: string,
  roles?: Role[]
): Promise<User> {
  const user = queryRunner.manager.create(User, { login, password: password });
  if (roles) {
    user.roles = Promise.resolve(roles);
  }
  return queryRunner.manager.save(user);
}
