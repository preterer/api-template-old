import { NextFunction, Request, Response, request } from "express";
import { configure, getLogger } from "log4js";
import Container from "typedi";

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
        level: config.app.isDevelopment ? "debug" : "info"
      }
    }
  });
  global.log = getLogger();
}

/**
 * Loggs request
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function logRequests(req: Request, res: Response, next: NextFunction): void {
  const requestData = {
    url: req.url,
    method: req.method,
    body: req.body,
    ip: req.ip,
    cookies: req.cookies,
    headers: req.headers
  };

  if (requestData.body && typeof requestData.body === "object") {
    const stringifiedBody = JSON.stringify(requestData.body);
    const bodyWithMaskedPassword = stringifiedBody.replace(/"(.*password)":".+"/gi, '"$1":"*******"');
    requestData.body = JSON.parse(bodyWithMaskedPassword);
  }

  res.send = logAndCall(res.send, requestData);
  res.json = logAndCall(res.json, requestData);
  res.jsonp = logAndCall(res.jsonp, requestData);
  res.render = logAndCall(res.render, requestData);
  res.redirect = logAndCall(res.status, requestData);

  next();
}

/**
 * Returns a function, which loggs data and calls original function
 *
 * @param {(...args) => any} originalFunction
 * @param {*} requestData
 * @returns {(...args) => any}
 */
function logAndCall(originalFunction: (...args) => any, requestData: any): (...args) => any {
  return function(this: Response, ...args) {
    const response = { response: args[0], status: this.statusCode };

    global.log.info({ request: requestData, response });
    return originalFunction.call(this, ...args);
  };
}
