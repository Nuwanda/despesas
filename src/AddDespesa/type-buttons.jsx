import React from 'react';
import PropTypes from 'prop-types';
import { Types } from '../DB/schema';

class TypeButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch(evt) {
    this.props.handleChange(evt.target.value);
  }

  render() {
    const choices = Types.map(type =>
      <p key={type}>
        <input
          className="with-gap"
          type="radio"
          name="types"
          id={type}
          value={type}
          required
          onClick={this.handleSwitch}
        />
        <label htmlFor={type}>
          {type}
        </label>
      </p>,
    );

    return (
      <div className="row">
        <label className="col s2 control-label" htmlFor="type">
          Categoria
        </label>
        <div className="col s10">
          <div>
            {choices}
          </div>
        </div>
      </div>
    );
  }
}

TypeButtons.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default TypeButtons;
