import React from 'react';
import Color from './Color';

const ENTER_KEY = 13;

@lore.connect(function(getState, props) {
  return {
    colors: getState('color.find')
  }
})
class ColorCreator extends React.Component {

  static propTypes = {
    colors: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      newColor: ''
    };
    this.onChangeNewColor = this.onChangeNewColor.bind(this);
    this.onKeyPressNewColor = this.onKeyPressNewColor.bind(this);
    this.onCreateColor = this.onCreateColor.bind(this);
  }

  onChangeNewColor(event) {
    this.setState({
      newColor: event.target.value
    });
  }

  onKeyPressNewColor(event) {
    if (event.charCode !== ENTER_KEY) {
      return;
    }
    this.onCreateColor();
  }

  onCreateColor() {
    const value = this.state.newColor.trim();

    if (value) {
      lore.actions.color.create({
        name: value
      });

      this.setState({
        newColor: ''
      });
    }
  }

  renderColor(color) {
    return (
      <Color key={color.id || color.cid} color={color}/>
    );
  }

  render() {
    const colors = this.props.colors;

    return (
      <div>
        <h2>Color Requests</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What color should Guessatron display?"
            value={this.state.newColor}
            onKeyPress={this.onKeyPressNewColor}
            onChange={this.onChangeNewColor} />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.onCreateColor}>
              Create
            </button>
          </span>
        </div>
        <div className="list-group" style={{paddingTop: '16px'}}>
          {colors.data.map(this.renderColor)}
        </div>
      </div>
    );
  }

}

export default ColorCreator;
