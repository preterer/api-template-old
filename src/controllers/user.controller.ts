import { Controller, QueryParams, Get, Param, Post, Body, Put, Delete } from "routing-controllers";
import { Inject } from "typedi";

import { Filters, EntityList } from "@preterer/typeorm-extensions";
import { User, UserService } from "@preterer/auth";

/**
 * Controller of users
 *
 * @export
 * @class UserController
 */
@Controller("/user")
export class UserController {
  @Inject()
  private readonly userService: UserService;

  /**
   * Lists users
   *
   * @param {Filters} filters
   * @returns {Promise<EntityList<User>>}
   * @memberof UserController
   */
  @Get("/")
  list(@QueryParams() filters?: Filters): Promise<EntityList<User>> {
    return this.userService.list(filters);
  }

  /**
   * Gets a user
   *
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof UserController
   */
  @Get("/:id(//d+)")
  get(@Param("id") id: number): Promise<User> {
    return this.userService.get(id);
  }

  /**
   * Inserts a user
   *
   * @param {User} model
   * @returns {Promise<number>}
   * @memberof UserController
   */
  @Post("/")
  add(@Body() model: User): Promise<number> {
    return this.userService.add(model).then(entity => entity.id);
  }

  /**
   * Updates a user
   *
   * @param {number} id
   * @param {User} model
   * @returns {Promise<number>}
   * @memberof UserController
   */
  @Put("/:id(//d+)")
  update(@Param("id") id: number, model: User): Promise<number> {
    return this.userService.update(id, model).then(entity => entity.id);
  }

  /**
   * Deletes a user
   *
   * @param {number} id
   * @returns {Promise<number>}
   * @memberof UserController
   */
  @Delete("/:id(//d+)")
  delete(@Param("id") id: number): Promise<number> {
    return this.userService.delete(id);
  }
}
