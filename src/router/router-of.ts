import {
  RouterDeleteRequest,
  RouterGetRequest,
  RouterPatchRequest,
  RouterPostRequest,
  RouterPutRequest,
} from './router'
import { ROUTER_METHOD } from './methods'

type RouterByMethod<
  M extends ROUTER_METHOD,
  P extends Dictionary,
  Q extends Dictionary,
  B
> = M extends ROUTER_METHOD.GET
  ? RouterGetRequest<P, Q>
  : M extends ROUTER_METHOD.POST
  ? RouterPostRequest<P, Q, B>
  : M extends ROUTER_METHOD.PATCH
  ? RouterPatchRequest<P, Q>
  : M extends ROUTER_METHOD.PUT
  ? RouterPutRequest<P, Q>
  : M extends ROUTER_METHOD.DELETE
  ? RouterDeleteRequest<P, Q>
  : never

const API_REQUEST = {
  [ROUTER_METHOD.GET]: RouterGetRequest,
  [ROUTER_METHOD.POST]: RouterPostRequest,
  [ROUTER_METHOD.DELETE]: RouterDeleteRequest,
  [ROUTER_METHOD.PATCH]: RouterPatchRequest,
  [ROUTER_METHOD.PUT]: RouterPutRequest,
}

const routerOf = <P extends Dictionary, Q extends Dictionary, B>(
  t:
    | RouterGetRequest<P, Q>
    | RouterPatchRequest<P, Q>
    | RouterPostRequest<P, Q, B>
    | RouterDeleteRequest<P, Q>
    | RouterPutRequest<P, Q>
) => t

const createRouterOfByMethod =
  <
    M extends ROUTER_METHOD,
    P extends Dictionary,
    Q extends Dictionary,
    B,
    A = RouterByMethod<M, P, Q, B>
  >(
    method: M
  ) =>
  <P extends Dictionary, Q extends Dictionary, B>(t: Omit<A, 'method'>) =>
    routerOf<P, Q, B>(new API_REQUEST[method](t as any))
