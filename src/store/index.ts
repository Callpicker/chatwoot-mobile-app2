import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, ThunkAction, Action, Middleware, AnyAction } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { appReducer } from '@/store/reducers';
import { setStore } from './storeAccessor';
import { contactListenerMiddleware } from './contact/contactListener';

// Disable this in testing environment
const shouldLoadDebugger = __DEV__ && !process.env.JEST_WORKER_ID;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactotronInstance = shouldLoadDebugger ? require('../../ReactotronConfig').default : null;

const CURRENT_VERSION = 2;

const persistConfig = {
  key: 'Root',
  version: CURRENT_VERSION,
  storage: AsyncStorage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  migrate: async (state: any) => {
    // If the stored version is older or doesn't exist, return initial state
    if (!state?._persist?.version || state._persist.version < CURRENT_VERSION) {
      const initialState = appReducer(undefined, { type: 'INIT' });
      return {
        ...initialState,
      };
    }
    return state;
  },
};

const middlewares: Middleware[] = [contactListenerMiddleware.middleware];

const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    const initialState = appReducer(undefined, { type: 'INIT' });
    const preservedSettings = { ...initialState.settings, localeValue: state.settings.localeValue, uiFlags: state.settings.uiFlags };
    return { ...initialState, settings: preservedSettings };
  }
  return appReducer(state, action);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  enhancers: shouldLoadDebugger ? [reactotronInstance.createEnhancer!()] : [],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // warnAfter: 128,
      },
      immutableCheck: { warnAfter: 128 },
    }).concat(middlewares),
});

// TODO: Please get rid of this
setStore(store);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
