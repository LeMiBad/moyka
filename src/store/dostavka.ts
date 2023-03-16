import { createStore } from 'effector';
import { createEvent } from 'effector';





export const changeDostavkaState = createEvent<boolean>()
export const $dostavkaState = createStore(true)
    .on(changeDostavkaState, (_, state) => state)