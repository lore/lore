import _ from 'lodash';

export function getStore(config, { reducers={} }) {
  const {
    redux: {
      middleware: _middleware,
      enhancer: _enhancer,
      rootReducer: _rootReducer,
      preloadedState: _preloadedState,
      configureStore: _configureStore
    }
  } = config;

  const enhancer = _enhancer(_middleware, config);
  const rootReducer = _rootReducer(reducers);
  const preloadedState = _preloadedState();

  return _configureStore(rootReducer, preloadedState, enhancer);
}
