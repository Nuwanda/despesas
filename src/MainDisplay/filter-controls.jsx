import React from 'react';
import PropTypes from 'prop-types';
import { Types } from '../DB/schema';

function validateDate(start, end) {
  if (!start || !end || new Date(end) >= new Date(start)) {
    return { date: { min: start, max: end } };
  }
  return { date: { min: '', max: '' } };
}

function validateMoney(start, end) {
  if (!start || !end || parseFloat(end) >= parseFloat(start)) {
    return { money: { min: start, max: end } };
  }
  return { money: { min: '', max: '' } };
}

// TODO: date validation should also be done on blur
class FilterControls extends React.Component {
  constructor(props) {
    super(props);
    this.labels = [];
    this.moneyLabels = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.notifyParent = props.onChange;
    this.state = {
      date: { min: '', max: '' },
      money: { min: '', max: '' },
      type: '',
      extra: '',
      note: '',
    };
  }

  componentDidMount() {
    this.labels.map(l => l.classList.add('active'));
    $('#filter-type-choice').material_select();
    $('#filter-type-choice').on('change', this.handleChange);
    $('#filter-extra-choice').material_select();
    $('#filter-extra-choice').on('change', this.handleChange);
  }

  componentDidUpdate() {
    this.notifyParent(this.state);
  }

  componentWillUnmount() {
    $('#filter-type-choice').material_select('destroy');
    $('#filter-extra-choice').material_select('destroy');
  }

  handleChange(evt) {
    const value = evt.target.value;
    switch (evt.target.id) {
      case 'filter-start-date':
        this.setState(prev => validateDate(value, prev.date.max));
        break;
      case 'filter-end-date':
        this.setState(prev => validateDate(prev.date.min, value));
        break;
      case 'filter-start-money':
        this.setState({ money: { ...this.state.money, min: value } });
        break;
      case 'filter-end-money':
        this.setState({ money: { ...this.state.money, max: value } });
        break;
      case 'filter-type-choice':
        this.setState({ type: value });
        break;
      case 'filter-extra-choice':
        this.setState({ extra: value });
        break;
      case 'filter-note':
        this.setState({ note: value });
        break;
      default:
        console.error('Input id not recognized: ', evt.target.id);
    }
  }

  handleValidate(evt) {
    const value = evt.target.value;
    switch (evt.target.id) {
      case 'filter-start-money':
        this.setState(prev => validateMoney(value, prev.money.max));
        break;
      case 'filter-end-money':
        this.setState(prev => validateMoney(prev.money.min, value));
        break;
      default:
        console.error('Input id not recognized: ', evt.target.id);
    }
  }

  render() {
    return (
      <div className="row">
        <form className="col l12" autoComplete="off" id="filterForm">
          <div className="row">
            <h5>Filtros:</h5>
          </div>
          <div className="row">
            <div className="input-field col l3">
              <input
                type="date"
                id="filter-start-date"
                value={this.state.date.min}
                onChange={this.handleChange}
              />
              <label
                ref={c => {
                  this.labels.push(c);
                }}
                htmlFor="filter-start-date"
              >
                Desde
              </label>
            </div>
            <div className="input-field col l3">
              <input
                type="date"
                id="filter-end-date"
                value={this.state.date.max}
                onChange={this.handleChange}
              />
              <label
                ref={c => {
                  this.labels.push(c);
                }}
                htmlFor="filter-end-date"
              >
                Até
              </label>
            </div>
            <div className="input-field col l3">
              <input
                type="number"
                id="filter-start-money"
                min="0"
                max="99999"
                placeholder="0"
                value={this.state.money.min}
                onChange={this.handleChange}
                onBlur={this.handleValidate}
              />
              <label
                ref={c => {
                  this.labels.push(c);
                }}
                htmlFor="filter-start-money"
              >
                Valor Mínimo
              </label>
            </div>
            <div className="input-field col l3">
              <input
                type="number"
                id="filter-end-money"
                min="0"
                max="99999"
                placeholder="99999"
                value={this.state.money.max}
                onChange={this.handleChange}
                onBlur={this.handleValidate}
              />
              <label
                ref={c => {
                  this.labels.push(c);
                }}
                htmlFor="filter-end-money"
              >
                Valor Máximo
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col l4">
              <select id="filter-type-choice">
                <option value="">Todas</option>
                {Types.map(type =>
                  <option key={type} value={type}>
                    {type}
                  </option>,
                )}
              </select>
              <label htmlFor="filter-type-choice">Categoria</label>
            </div>
            <div className="input-field col l4">
              <select id="filter-extra-choice">
                <option value="">Todas</option>
                {['Normais', 'Extraordinárias'].map(extra =>
                  <option key={extra} value={extra}>
                    {extra}
                  </option>,
                )}
              </select>
              <label htmlFor="filter-extra-choice">Extras?</label>
            </div>
            <div className="input-field col l4">
              <input
                type="text"
                id="filter-note"
                onChange={this.handleChange}
              />
              <label htmlFor="filter-note">Descrição</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

FilterControls.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterControls;
