import bodyParser from "body-parser";
import { Response } from "express";
import { Body, Controller, Post, Res, UseBefore } from "routing-controllers";
import { Inject } from "typedi";
import { DeepPartial } from "typeorm";

import { LoginData, User, UserService } from "@preterer/auth";

/**
 * Authentication controller
 *
 * @export
 * @class AuthController
 */
@Controller()
@UseBefore(bodyParser.json())
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
  login(@Body() loginData: LoginData, @Res() response: Response): Promise<string | Response> {
    return this.userService.login(loginData).catch(error => response.status(401).send(error.message));
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
