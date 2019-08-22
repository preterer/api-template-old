import Container from "typedi";
import { configure, getLogger } from "log4js";

import { Config } from "../config/config";

/**
 * Configures logger for application
 *
 * @export
 */
export function configureLogger(): void {
  const config = Container.get(Config);
  configure({
    appenders: {
      daily: {
        type: "dateFile",
        filename: "./logs/api.log",
        layout: { type: "basic", separator: "" },
        alwaysIncludePattern: true,
        pattern: "yyyy-MM-dd",
        keepFileExt: true,
        compress: true
      },
      console: {
        type: "console",
        layout: { type: "coloured" }
      }
    },
    categories: {
      default: {
        appenders: ["daily", "console"],
        level: config.app.isDevelopment ? "debug" : "error"
      }
    }
  });
  global.log = getLogger();
}
