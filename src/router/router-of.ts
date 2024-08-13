import {
  DeleteRouter,
  GetRouter,
  PatchRouter,
  PostRouter,
  PutRouter,
} from './router'
import { ROUTER_METHOD } from './methods'

type RouterByMethod<
  M extends ROUTER_METHOD,
  P extends Dictionary,
  Q extends Dictionary,
  B
> = M extends ROUTER_METHOD.GET
  ? GetRouter<P, Q>
  : M extends ROUTER_METHOD.POST
  ? PostRouter<P, Q, B>
  : M extends ROUTER_METHOD.PATCH
  ? PatchRouter<P, Q>
  : M extends ROUTER_METHOD.PUT
  ? PutRouter<P, Q>
  : M extends ROUTER_METHOD.DELETE
  ? DeleteRouter<P, Q>
  : never

const ROUTER_BY_METHOD = {
  [ROUTER_METHOD.GET]: GetRouter,
  [ROUTER_METHOD.POST]: PostRouter,
  [ROUTER_METHOD.DELETE]: DeleteRouter,
  [ROUTER_METHOD.PATCH]: PatchRouter,
  [ROUTER_METHOD.PUT]: PutRouter,
}

const generateRouterOfByMethod =
  <
    M extends ROUTER_METHOD,
    P extends Dictionary,
    Q extends Dictionary,
    B,
    A = RouterByMethod<M, P, Q, B>
  >(
    method: M
  ) =>
  (t: Omit<A, 'method'>) => {
    const Router = ROUTER_BY_METHOD[method] as any

    return new Router(t) as A
  }

export const getOf = generateRouterOfByMethod(ROUTER_METHOD.GET)
export const postOf = generateRouterOfByMethod(ROUTER_METHOD.POST)
export const putOf = generateRouterOfByMethod(ROUTER_METHOD.PUT)
export const patchOf = generateRouterOfByMethod(ROUTER_METHOD.PATCH)
export const deleteOf = generateRouterOfByMethod(ROUTER_METHOD.DELETE)
