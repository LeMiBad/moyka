import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";





export const getJWT = createEffect( async () => {
  const jwt = await axios.get("https://sts-identity.intelwash.ru/.well-known/openid-configuration/jwks")

  return jwt.data.keys
})
export const $jwt = createStore<any>(null)
  .on(getJWT.done, (_, { result }) => result)