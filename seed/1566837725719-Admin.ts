import { MigrationInterface, QueryRunner } from "typeorm";

import { Role, User } from "@preterer/auth";

import { createRole, createUser } from "./utils/seedUtils";

export class Admin1566837725719 implements MigrationInterface {
  private rootRoleName = "User";
  private adminRoleName = "Admin";
  private adminLogin = "admin";
  private adminPassword = "adminadmin";

  public async up(queryRunner: QueryRunner): Promise<any> {
    const rootRole = await this.createRootRole(queryRunner);
    const adminRole = await this.createAdminRole(queryRunner, rootRole);
    await this.createAdminUser(queryRunner, adminRole);
  }

  private async createRootRole(queryRunner: QueryRunner): Promise<Role> {
    return createRole(queryRunner, this.rootRoleName);
  }

  private async createAdminRole(queryRunner: QueryRunner, rootRole: Role): Promise<Role> {
    return createRole(queryRunner, this.adminRoleName, rootRole);
  }

  private async createAdminUser(queryRunner: QueryRunner, adminRole: Role): Promise<User> {
    return createUser(queryRunner, this.adminLogin, this.adminPassword, [adminRole]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // not implementing downs in seed
  }
}
