import React from 'react';
import { Types } from '../DB/schema';

function validateState(state) {
  const validated = state;
  return validated;
}

class FilterControls extends React.Component {
  constructor() {
    super();
    this.labels = [];
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.labels.map(l => l.classList.add('active'));
    $('#filter-type-choice').material_select();
    $('#filter-type-choice').on('change', this.handleChange);
    $('#filter-extra-choice').material_select();
    $('#filter-extra-choice').on('change', this.handleChange);
  }

  componentWillUnmount() {
    $('#filter-type-choice').material_select('destroy');
    $('#filter-extra-choice').material_select('destroy');
  }

  // TODO: validate maxDate > minDate, maxMoney > minMoney
  handleChange(evt) {
    switch (evt.target.id) {
      case 'filter-start-date':
        if (evt.target.value) {
          this.setState(
            validateState({
              date: { ...this.state.date, min: new Date(evt.target.value) },
            }),
          );
        } else {
          this.setState(
            validateState({
              date: { ...this.state.date, min: new Date(1984, 3, 3) },
            }),
          );
        }
        break;
      case 'filter-end-date':
        if (evt.target.value) {
          this.setState(
            validateState({
              date: { ...this.state.date, max: new Date(evt.target.value) },
            }),
          );
        } else {
          this.setState(
            validateState({
              date: { ...this.state.date, max: new Date(2100, 11, 31) },
            }),
          );
        }
        break;
      case 'filter-start-money':
        this.setState(
          validateState({
            money: { ...this.state.money, min: evt.target.value },
          }),
        );
        break;
      case 'filter-end-money':
        this.setState(
          validateState({
            money: { ...this.state.money, max: evt.target.value },
          }),
        );
        break;
      case 'filter-type-choice':
        this.setState(validateState({ type: evt.target.value }));
        break;
      case 'filter-extra-choice':
        this.setState(validateState({ extra: evt.target.value }));
        break;
      case 'filter-note':
        this.setState(validateState({ note: evt.target.value }));
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
                max="9999"
                onChange={this.handleChange}
              />
              <label htmlFor="filter-start-money">Valor Mínimo</label>
            </div>
            <div className="input-field col l3">
              <input
                type="number"
                id="filter-end-money"
                min="0"
                max="9999"
                onChange={this.handleChange}
              />
              <label htmlFor="filter-end-money">Valor Máximo</label>
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

export default FilterControls;
