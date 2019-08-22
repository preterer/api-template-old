/**
 * Application config
 *
 * @export
 * @class ApplicationConfig
 */
export class ApplicationConfig {
  /**
   * Application mode
   *
   * @type {string}
   * @memberof ApplicationConfig
   */
  mode: string = process.env.MODE;

  /**
   * Is development mode
   *
   * @type {boolean}
   * @memberof ApplicationConfig
   */
  isDevelopment: boolean = this.mode === "development";
}
