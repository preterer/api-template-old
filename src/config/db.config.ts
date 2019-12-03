import { LoggerOptions } from "typeorm/logger/LoggerOptions";

/**
 * Configuration of database
 *
 * @export
 * @class DBConfig
 */
export class DBConfig {
  /**
   * Type of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  type: string = process.env.DB_TYPE;

  /**
   * Name of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  name: string = process.env.DB_NAME;

  /**
   * Host of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  host: string = process.env.DB_HOST;

  /**
   * Port of database
   *
   * @type {number}
   * @memberof DBConfig
   */
  port: number = parseInt(process.env.DB_PORT);

  /**
   * Username
   *
   * @type {string}
   * @memberof DBConfig
   */
  user: string = process.env.DB_USER;

  /**
   * Password
   *
   * @type {string}
   * @memberof DBConfig
   */
  password: string = process.env.DB_PASSWORD;

  /**
   * Logging type
   *
   * @type {string}
   * @memberof DBConfig
   */
  logging: LoggerOptions = process.env.DB_LOGGING as LoggerOptions;

  /**
   * Allow TypeORM to automatically synchronize database
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  synchronize: boolean = process.env.DB_SYNCHRONIZE === "true";

  /**
   * Allow to drop schema
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  dropSchema: boolean = process.env.DB_DROP_SCHEMA === "true";

  /**
   * Allow to cache requests
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  cache: boolean = process.env.DB_CACHE === "true";
}
