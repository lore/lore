/* global lore */

import React from 'react';
import _ from 'lodash';
import { PayloadStates } from 'lore-utils';
import { Field } from 'lore-react-forms';
import onClickOutside from 'react-onclickoutside';

class AutoCompleteField extends Field {

  constructor(props) {
    super(props);

    // bind component methods
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.filter = this.filter.bind(this);

    // setup debounce if configured
    var debounceDelay = this.props.debounceDelay;
    if (debounceDelay > 0) {
      this.updateOptions = _.debounce(this.updateOptions, debounceDelay);
    }

    // if the value exists in the data, use it to set the initial search text
    const initialOption = _.find(props.options.data, function(option) {
      return option.id === props.data[props.name];
    });
    const searchText = initialOption ? initialOption.data[props.field] : '';

    this.state = {
      searchText: searchText,
      isModified: false,
      options: this.props.options,
      hasFocus: false
    };
  }

  onFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onBlur() { }

  handleClickOutside(event) {
    if (this.state.hasFocus) {
      this.setState({
        hasFocus: false,
        touched: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: this.filter(this.state.searchText)
    });
  }

  filter(searchText) {
    if (this.props.filter) {
      return this.props.filter(searchText);
    }

    return _.assign({}, this.state.options, {
      state: PayloadStates.RESOLVED
    });
  }

  /*
   * Change options based on user input
   */
  updateOptions(searchText) {
    this.setState({
      options: this.filter(searchText)
    });
  }

  handleUpdateInput(e) {
    const searchText = e.target.value;

    this.setState({
      searchText: searchText,
      isModified: true
    });

    if (this.props.debounceDelay > 0) {
      this.setState({
        options: _.assign({}, this.state.options, {
          state: PayloadStates.FETCHING
        })
      });
    }

    this.updateOptions(searchText);
  }

  handleNewRequest(item, index) {
    this.props.onChange(this.props.name, item.value);
    this.setState({
      searchText: item.text,
      hasFocus: false
    });
    this.handleUpdateInput({
      target: {
        value: item.text
      }
    });
  }

  renderOption(option) {
    return (
      <li
        key={option.value}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          this.handleNewRequest(option);
        }}
      >
        <a>{option.text}</a>
      </li>
    );
  }

  render() {
    const {
      name,
      errors,
      hintText,
      label,
      option,
      field
    } = this.props;

    const {
      touched,
      isModified,
      options
    } = this.state;

    const error = errors[name];
    const displayError = touched && error;

    const searchText = option ? (
      isModified ? this.state.searchText : option.data[field]
    ) : this.state.searchText;

    let suggestions = null;

    function mapDataToOptions(data) {
      return data.map(function(datum) {
        return {
          value: datum.id,
          text: datum.data[field]
        };
      });
    }

    if (options.state === PayloadStates.FETCHING) {
      suggestions = (
        <li className="disabled">
          <a>Searching...</a>
        </li>
      );
    } else if (options.data.length > 0) {
      suggestions = mapDataToOptions(options.data).map(this.renderOption);
    } else {
      suggestions = (
        <li className="disabled">
          <a>No results</a>
        </li>
      );
    }

    let className = 'form-group dropdown';
    if (this.state.hasFocus) {
      className += ' open';
    }
    if (displayError) {
      className += ' has-error';
    }

    return (
      <div className={className}>
        {label ? (
          <label>{label}</label>
        ): null}
        <input
          type="text"
          value={searchText}
          onChange={this.handleUpdateInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className="form-control"
          placeholder={hintText}
        />
        <ul className="dropdown-menu col-xs-12">
          {suggestions}
        </ul>
        {displayError ? (
          <span className="help-block">{error}</span>
        ) : null}
      </div>
    );
  }

}

AutoCompleteField.propTypes = _.assign({}, {
  options: React.PropTypes.object.isRequired,
  debounceDelay: React.PropTypes.number,
  filter: React.PropTypes.func
});

AutoCompleteField.defaultProps = _.assign({}, {
  options: {
    data: []
  },
  debounceDelay: 250
});

export default onClickOutside(AutoCompleteField);
