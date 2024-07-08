export enum ROUTER_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type RouterMethods =
  | Uppercase<EnumValues<typeof ROUTER_METHOD>>
  | Lowercase<EnumValues<typeof ROUTER_METHOD>>
  | ROUTER_METHOD
