import { Container } from "typedi";

import { User, Role, UserService } from "@preterer/auth";

import { mockDB, clearDB } from "./testUtils";
import { mockPermission, mockUser, mockRole } from "./mocks";

import { checkPermission } from "../src/middleware/checkPermission";

describe("checkPermission", function() {
  const permissionName = "test";
  const entityType = "test";
  const entityId = "1";
  let mockedUser: User;
  let mockedRole: Role;
  let userService: UserService;

  beforeAll(async function() {
    await mockDB();
    userService = Container.get(UserService);
  });

  beforeEach(async function() {
    mockedUser = await mockUser();
    mockedRole = await mockRole();
  });

  afterEach(async function() {
    clearDB();
  });

  describe("validation", function() {
    it("should pass when user has permission", async function() {
      await mockPermission(permissionName, mockedUser.id);
      const success = await useMiddleware(permissionName);
      expect(success).toBeTruthy();
    });

    it("should pass when user has role with permission", async function() {
      await mockPermission(permissionName, undefined, mockedRole.id);
      await userService.roleAdd(mockedUser.id, mockedRole.id);
      const success = await useMiddleware(permissionName, ["params", "id"]);
      expect(success).toBeTruthy();
    });

    it("should fail when user doesn't have permission", async function() {
      const success = await useMiddleware(permissionName);
      expect(success).toBeFalsy();
    });

    it("should fail when user has permission with wrong entity", async function() {
      await mockPermission(permissionName, mockedUser.id, undefined, entityId + "fail", entityType);
      const success = await useMiddleware(permissionName);
      expect(success).toBeFalsy();
    });
  });

  async function useMiddleware(requiredPermission: string, path: string | string[] = "params.id"): Promise<boolean> {
    let success: boolean;
    await checkPermission(requiredPermission, entityType, path)(
      { params: { id: entityId }, user: { id: mockedUser.id } } as any,
      { sendStatus: _ => (success = false) } as any,
      () => (success = true)
    );
    return success;
  }
});
