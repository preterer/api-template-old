import { Controller, Post, Body } from "routing-controllers";
import { DeepPartial } from "typeorm";
import { Inject } from "typedi";

import { UserService, LoginData, User } from "@preterer/auth";

/**
 * Authentication controller
 *
 * @export
 * @class AuthController
 */
@Controller()
export class AuthController {
  @Inject()
  private readonly userService: UserService;

  /**
   * Logs in an user
   *
   * @param {LoginData} loginData
   * @returns {Promise<string>}
   * @memberof AuthController
   */
  @Post("/login")
  login(@Body() loginData: LoginData): Promise<string> {
    return this.userService.login(loginData);
  }

  /**
   * Registers an user
   *
   * @param {DeepPartial<User>} model
   * @returns {Promise<number>}
   * @memberof AuthController
   */
  @Post("/register")
  register(@Body() model: DeepPartial<User>): Promise<{ id: number }> {
    return this.userService.add(model).then(user => ({ id: user.id }));
  }
}
