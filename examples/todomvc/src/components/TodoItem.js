import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ReactDom from 'react-dom';
import cx from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default createReactClass({

  handleSubmit: function (event) {
    const val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  },

  handleEdit: function () {
    const { todo } = this.props;
    this.props.onEdit();
    this.setState({
      editText: todo.data.title
    });
  },

  handleKeyDown: function (event) {
    const { todo } = this.props;

    if (event.which === ESCAPE_KEY) {
      this.setState({
        editText: todo.data.title
      });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  },

  handleChange: function (event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value});
    }
  },

  getInitialState: function () {
    const { todo } = this.props;
    return {
      editText: todo.data.title
    };
  },

  /**
   * This is a completely optional performance enhancement that you can
   * implement on any React component. If you were to delete this method
   * the app would still work correctly (and still be very performant!), we
   * just use it as an example of how little code it takes to get an order
   * of magnitude performance improvement.
   */
  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  },

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  },

  onDestroy: function() {
    this.props.onDestroy();
  },

  render: function () {
    const { todo } = this.props;

    return (
      <li className={cx({
        completed: todo.data.isCompleted,
        editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.data.isCompleted}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {todo.data.title}
          </label>
          <button className="destroy" onClick={this.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
});
