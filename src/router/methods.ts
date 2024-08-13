export enum ROUTER_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type RouterMethods = Uppercase<ROUTER_METHOD> | Lowercase<ROUTER_METHOD>
