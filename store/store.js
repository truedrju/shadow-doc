import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import helperReducer from './helperSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    helper: helperReducer,
    user: userReducer,

    // Add the generated reducer as a specific top-level slice
    // [plumApi.reducerPath]: plumApi.reducer,

    
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    })),   // })).concat(plumApi.middleware),
    
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)