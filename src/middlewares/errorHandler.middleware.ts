import axios from "axios";
import { Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { IRequest } from "../interfaces/IRequest.interface";

@Middleware({ type: "after", priority: 1 })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: IRequest,
    response: Response,
    next: (err?: any) => any
  ) {
    if (error instanceof axios.Cancel) return;
    const { message, name, errors = [], httpCode = 500 } = error;
    response.status(httpCode).json({
      httpCode,
      message: message,
      type: name,
      errors,
    });
    next();
  }
}
