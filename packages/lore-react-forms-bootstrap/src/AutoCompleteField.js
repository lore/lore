var React = require('react');
var _ = require('lodash');
var PayloadStates = require('lore-utils').PayloadStates;

var Field = require('lore-react-forms/Field');
import onClickOutside from 'react-onclickoutside'

class AutoCompleteField extends Field {

  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    // this.handleUpdateInput = _.debounce(this.handleUpdateInput, 500);

    this.handleNewRequest = this.handleNewRequest.bind(this);
    // this.handleNewRequest = _.debounce(this.handleNewRequest, 1000);

    this.updateOptions = this.updateOptions.bind(this);
    this.updateOptions = _.debounce(this.updateOptions, 250);
    this.renderOption = this.renderOption.bind(this);

    var initialOption = _.find(props.options.data, function(option) {
      console.log('props.data[props.name]: ' + props.data[props.name]);
      return option.id === props.data[props.name];
    });

    var searchText = initialOption ? initialOption.data[props.field] : '';

    this.state = {
      searchText: searchText,
      isModified: false,
      options: this.props.options || {
        data: [],
        query: {}
      },
      hasFocus: false
    };
  }

  onFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onBlur() {
    // this.setState({
    //   touched: true
    // });
  }

  handleClickOutside(event) {
    console.log('clicked outside!');
    if (this.state.hasFocus) {
      this.setState({
        hasFocus: false,
        touched: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    var options = this.state.options;
    var query = options.query;
    var nextOptions = lore.store.getState().user.find[JSON.stringify(query)];
    this.setState({
      options: nextOptions || options
    });
  };

  updateOptions(searchText) {
    console.log('updateOptions: ' + searchText);
    this.setState({
      options: lore.getState('user.find', {
        where: {
          username_like: searchText
        }
      })
    });
  }

  handleUpdateInput(e) {
    var searchText = e.target.value;
    console.log('handleUpdateInput: ' + searchText);
    this.setState({
      searchText: searchText,
      isModified: true,
      options: {
        state: PayloadStates.FETCHING,
        data: [
          {
            id: 0,
            data: {
              id: 0,
              username: 'Searching...'
            }
          }
        ],
        query: {}
      }
    });

    this.updateOptions(searchText);
  }

  handleNewRequest(item, index) {
    console.log('handleNewRequest');
    // this.setState({
    //   searchText: '',
    // });
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
        style={{cursor: 'pointer'}}
        onClick={() => {
          this.handleNewRequest(option)
        }}>
        <a>{option.text}</a>
      </li>
    );
  }

  render() {
    var name = this.props.name;
    var error = this.props.errors[name];
    var value = this.props.data[name];
    var touched = this.state.touched;
    var hintText = this.props.hintText;
    var label = this.props.label;
    var disabled = this.props.disabled;
    var displayError = touched && error;

    var isModified = this.state.isModified;
    var option = this.props.option;
    var field = this.props.field;
    var searchText = option ? (isModified ? this.state.searchText : option.data[field]) : this.state.searchText;

    var options = this.state.options;
    // options.data = options.data || [];
    var suggestions = null;

    function mapDataToOptions(data) {
      return data.map(function(datum) {
        return {
          value: datum.id,
          text: datum.data[field]
        }
      });
    }

    // var optionsData = mapDataToOptions(options.data);
    // var dataSource = [{ value: null, text: ''}].concat(optionsData);
    var dataSource = mapDataToOptions(options.data);
    var filter = function(a,b,c) {
      return true;
    };

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

    var className = "form-group dropdown";
    if (this.state.hasFocus) {
      className += " open";
    }
    if (displayError) {
      className += " has-error";
    }

    return (
      <div className={className}>
        <label>{label}</label>
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
  options: React.PropTypes.object.isRequired
});

AutoCompleteField.defaultProps = _.assign({}, {
  options: {
    data: []
  }
});

module.exports = onClickOutside(AutoCompleteField);
