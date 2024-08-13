import type { NextFunction, Request } from 'express'
import { ROUTER_METHOD, type RouterMethods } from './methods'

export interface IRouter<
  M extends RouterMethods,
  P extends Dictionary,
  Q extends Dictionary,
  B = M extends 'POST' | 'post' | ROUTER_METHOD.POST ? any : never
> {
  defaultBody?: B
  defaultParams?: P
  defaultQuery?: Q
  method?: M
  middlewares?: NextFunction[]
  path: string
  handler<T, B, P, Q>(
    req: Request<P, T, B, Q>
  ): PromiseLike<{
    status: number
    headers: Dictionary
    data: T
    error: Error
  }>
}

export abstract class Router<
  M extends RouterMethods,
  P extends Dictionary,
  Q extends Dictionary,
  B = M extends 'POST' | 'post' | ROUTER_METHOD.POST ? any : never
> implements IRouter<M, P, Q, B>
{
  method: M
  middlewares
  path
  handler

  constructor({ method, middlewares, path, handler }: IRouter<M, P, Q, B>) {
    this.method = method ?? (ROUTER_METHOD.GET as any)
    this.middlewares = (middlewares ?? []) as NextFunction[]
    this.path = path
    this.handler = handler
  }
}

export class GetRouter<
  P extends Dictionary,
  Q extends Dictionary
> extends Router<ROUTER_METHOD.GET, P, Q> {
  constructor(params: Omit<IRouter<ROUTER_METHOD.GET, P, Q>, 'method'>) {
    super({ ...params })
  }
}

export class PostRouter<
  P extends Dictionary,
  Q extends Dictionary,
  B
> extends Router<ROUTER_METHOD.POST, P, Q, B> {
  constructor(params: Omit<IRouter<ROUTER_METHOD.POST, P, Q, B>, 'method'>) {
    super({ ...params, method: ROUTER_METHOD.POST })
  }
}

export class PutRouter<
  P extends Dictionary,
  Q extends Dictionary
> extends Router<ROUTER_METHOD.PUT, P, Q> {
  constructor(params: Omit<IRouter<ROUTER_METHOD.PUT, P, Q>, 'method'>) {
    super({ ...params, method: ROUTER_METHOD.PUT })
  }
}

export class PatchRouter<
  P extends Dictionary,
  Q extends Dictionary
> extends Router<ROUTER_METHOD.PATCH, P, Q> {
  constructor(params: Omit<IRouter<ROUTER_METHOD.PATCH, P, Q>, 'method'>) {
    super({ ...params, method: ROUTER_METHOD.PATCH })
  }
}

export class DeleteRouter<
  P extends Dictionary,
  Q extends Dictionary
> extends Router<ROUTER_METHOD.DELETE, P, Q> {
  constructor(params: Omit<IRouter<ROUTER_METHOD.DELETE, P, Q>, 'method'>) {
    super({ ...params, method: ROUTER_METHOD.DELETE })
  }
}
