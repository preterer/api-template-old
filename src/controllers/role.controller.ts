import { Body, Controller, Delete, Get, Param, Post, Put, QueryParams } from "routing-controllers";
import { Inject } from "typedi";

import { Role, RoleModel, RoleService } from "@preterer/auth";
import { EntityList, Filters } from "@preterer/typeorm-extensions";

/**
 * Controller of roles
 *
 * @export
 * @class RoleController
 */
@Controller("/role")
export class RoleController {
  @Inject()
  private readonly roleService: RoleService;

  /**
   * Lists roles
   *
   * @param {Filters} filters
   * @returns {Promise<EntityList<Role>>}
   * @memberof RoleController
   */
  @Get("/")
  list(@QueryParams() filters?: Filters): Promise<EntityList<Role>> {
    return this.roleService.list(filters);
  }

  /**
   * Gets a role
   *
   * @param {number} id
   * @returns {Promise<Role>}
   * @memberof RoleController
   */
  @Get("/:id(//d+)")
  get(@Param("id") id: number): Promise<Role> {
    return this.roleService.get(id);
  }

  /**
   * Inserts a role
   *
   * @param {Role} model
   * @returns {Promise<number>}
   * @memberof RoleController
   */
  @Post("/")
  add(@Body() model: RoleModel): Promise<number> {
    return this.roleService.add(model).then(entity => entity.id);
  }

  /**
   * Updates a role
   *
   * @param {number} id
   * @param {Role} model
   * @returns {Promise<number>}
   * @memberof RoleController
   */
  @Put("/:id(//d+)")
  update(@Param("id") id: number, model: RoleModel): Promise<number> {
    return this.roleService.update(id, model).then(entity => entity.id);
  }

  /**
   * Deletes a role
   *
   * @param {number} id
   * @returns {Promise<number>}
   * @memberof RoleController
   */
  @Delete("/:id(//d+)")
  delete(@Param("id") id: number): Promise<number> {
    return this.roleService.delete(id);
  }
}
