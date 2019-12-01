import { Service } from "typedi";

import { ApplicationConfig } from "./app.config";
import { DBConfig } from "./db.config";

/**
 * Application config
 *
 * @export
 * @class Config
 */
@Service()
export class Config {
  /**
   * Database config
   *
   * @type {DBConfig}
   * @memberof Config
   */
  db: DBConfig = new DBConfig();

  /**
   * Application related config
   *
   * @type {ApplicationConfig}
   * @memberof Config
   */
  app: ApplicationConfig = new ApplicationConfig();
}
