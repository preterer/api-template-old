import { Controller, QueryParams, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { Inject } from "typedi";

import { Filters, EntityList } from "@preterer/typeorm-extensions";
import { Permission, PermissionService, PermissionModel } from "@preterer/auth";

/**
 * Controller of permissions
 *
 * @export
 * @class PermissionController
 */
@Controller("/permission")
export class PermissionController {
  @Inject()
  private readonly permissionService: PermissionService;

  /**
   * Lists permissions
   *
   * @param {Filters} filters
   * @returns {Promise<EntityList<Permission>>}
   * @memberof PermissionController
   */
  @Get("/")
  list(@QueryParams() filters?: Filters): Promise<EntityList<Permission>> {
    return this.permissionService.list(filters);
  }

  /**
   * Gets a permission
   *
   * @param {number} id
   * @returns {Promise<Permission>}
   * @memberof PermissionController
   */
  @Get("/:id(//d+)")
  get(@Param("id") id: number): Promise<Permission> {
    return this.permissionService.get(id);
  }

  /**
   * Inserts a permission
   *
   * @param {Permission} model
   * @returns {Promise<number>}
   * @memberof PermissionController
   */
  @Post("/")
  add(@Body() model: PermissionModel): Promise<number> {
    return this.permissionService.add(model).then(entity => entity.id);
  }

  /**
   * Updates a permission
   *
   * @param {number} id
   * @param {Permission} model
   * @returns {Promise<number>}
   * @memberof PermissionController
   */
  @Put("/:id(//d+)")
  update(@Param("id") id: number, model: PermissionModel): Promise<number> {
    return this.permissionService.update(id, model).then(entity => entity.id);
  }

  /**
   * Deletes a permission
   *
   * @param {number} id
   * @returns {Promise<number>}
   * @memberof PermissionController
   */
  @Delete("/:id(//d+)")
  delete(@Param("id") id: number): Promise<number> {
    return this.permissionService.delete(id);
  }
}
