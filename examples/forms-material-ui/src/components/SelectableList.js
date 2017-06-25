import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  class SelectableList extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this.handleRequestChange = this.handleRequestChange.bind(this);
    }

    // static propTypes = {
    //   children: PropTypes.node.isRequired,
    //   defaultValue: PropTypes.number.isRequired,
    // };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event, index) {
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  }

  SelectableList.propTypes = {
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.number.isRequired,
  };

  return SelectableList;
}

SelectableList = wrapState(SelectableList);

module.exports = SelectableList;
