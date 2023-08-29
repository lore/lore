import React from 'react';
import PropTypes from 'prop-types';
import ActionsContext from '../contexts/ActionsContext';
import BlueprintsContext from '../contexts/BlueprintsContext';
import ReducerActionMapContext from '../contexts/ReducerActionMapContext';
import StoreContext from '../contexts/StoreContext';

class ConnectProvider extends React.Component {
  constructor(props) {
    super(props);

    const { store } = props;

    this.state = {
      storeState: store.getState()
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const { store } = this.props;

    this.unsubscribe = store.subscribe(() => {
      // There's no guarantee the component will still be mounted, when this
      // callback is invoked, so we need to check before updating state
      if (this._isMounted) {
        this.setState({
          storeState: store.getState()
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const {
      store,
      actions,
      blueprints,
      reducerActionMap,
      children,
      // context
    } = this.props;

    return (
      <ActionsContext.Provider value={actions}>
        <BlueprintsContext.Provider value={blueprints}>
          <ReducerActionMapContext.Provider value={reducerActionMap}>
            <StoreContext.Provider value={store}>
              {React.Children.map(children, function(child) {
                if (child) {
                  return React.cloneElement(child);
                }
              })}
            </StoreContext.Provider>
          </ReducerActionMapContext.Provider>
        </BlueprintsContext.Provider>
      </ActionsContext.Provider>
    );
  }
}

ConnectProvider.propTypes = {
  actions: PropTypes.object.isRequired,
  blueprints: PropTypes.object.isRequired,
  reducerActionMap: PropTypes.object.isRequired,
  context: PropTypes.object,
  children: PropTypes.any
};

export { ConnectProvider };
export default ConnectProvider;
