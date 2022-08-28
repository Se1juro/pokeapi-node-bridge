import axios from "axios";
import { Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import cluster from "cluster";

@Middleware({ type: "after", priority: 1 })
export class ErrorHandlerMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any) {
    cluster.worker?.kill();
    next();
  }
}
