import { PreloadedState,
  combineReducers,
  configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/users/usersSlice'

const rootReducer = combineReducers({
    users: userReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type Store = ReturnType<typeof setupStore>
