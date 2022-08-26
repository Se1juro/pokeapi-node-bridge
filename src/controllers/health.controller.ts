import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@JsonController()
export class UserController {
  @Get('/health')
  getAll() {
    return "Server ON"
  }
}