import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { authSlice, chatSlice } from "../redux";
import config from "../config";
import { logger } from "../utils";

const RootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
});

const encryptor = encryptTransform({
  secretKey: `${config.NAME_KEY}-storage`,
  onError: (error) => {
    logger({ error });
  },
});

const persistConfig = {
  key: config.NAME_KEY,
  storage,
  whitelist: ["auth"],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: config.NODE_ENV !== "production",
});

export default store;

export const Persistor = persistStore(store);
