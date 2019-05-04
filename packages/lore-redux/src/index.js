export { getConfig } from './getConfig';
export { StoreContext } from './StoreContext';
export { useStore } from './useStore';

export function getStore(reducers={}, configOverride) {
  const config = getConfig(configOverride);
  const middleware = config.middleware;
  const enhancer = config.enhancer(middleware, { redux: config });
  const rootReducer = config.rootReducer(reducers);
  const preloadedState = config.preloadedState();
  return config.configureStore(rootReducer, preloadedState, enhancer);
}
