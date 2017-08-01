import React from 'react';
import PropTypes from 'prop-types';
import { Types } from '../DB/schema';

class TypeChoice extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    // :angry: god damn MaterializeCSS
    this.domNode = $('#typeChoice');
    this.domNode.material_select();
    this.domNode.on('change', this.handleSwitch);
  }

  componentWillUnmount() {
    this.domNode.material_select('destroy');
  }

  clear() {
    this.domNode.prop('selectedIndex', 0);
    this.domNode.material_select();
  }

  handleSwitch(evt) {
    this.props.handleChange(evt.target.value);
  }

  render() {
    const choices = Types.map(type =>
      <option key={type} value={type}>
        {type}
      </option>,
    );

    return (
      <div className="row">
        <label className="col l2 control-label" htmlFor="type">
          Categoria
        </label>
        <div className="col l10 input-field">
          <select id="typeChoice" className="form-control" name="typeChoice">
            <option value="">Escolhe uma...</option>
            {choices}
          </select>
        </div>
      </div>
    );
  }
}

TypeChoice.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default TypeChoice;
