import React from 'react';
import TypeChoice from './type-choice';
import { Expense } from '../DB/schema';
import DBUtil from '../DB/db-util';
import ListDespesa from '../Lists/list-despesas';

// TODO: add validation to the select element, validation is working but error messages aren't shown
class AddDespesa extends React.Component {
  constructor(props) {
    super(props);

    this.typeChanged = this.typeChanged.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      money: '',
      date: '',
      type: '',
      note: '',
      extra: false,
      expenses: [],
    };
  }

  typeChanged(value) {
    this.setState({ type: value });
  }

  inputChanged(evt) {
    const field = evt.target.id;
    this.setState({ [field]: evt.target.value });
  }

  checkboxChanged(evt) {
    this.setState({ extra: evt.target.checked });
  }

  handleSubmit(evt) {
    const form = document.getElementById('formDespesa');
    if (form.checkValidity()) {
      // Hack validation for the type element because MaterializeCSS is terrible, stop using it
      if (this.state.type === null) {
        evt.preventDefault();
        console.error('Type was left null');
        return false;
      }
      evt.preventDefault();

      const expense = new Expense(this.state);
      this.setState(prev => {
        const expenses = prev.expenses.slice();
        expenses.push(expense);
        return {
          expenses,
          money: '',
          date: '',
          type: '',
          extra: false,
          note: '',
        };
      });
      this.typeComponent.clear();
      this.moneyInput.focus();
    }
    return true;
  }

  handleSave() {
    DBUtil.insert(this.state.expenses).then(() => {
      console.log('Items added');
      this.setState({ expenses: [] });
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col l6" autoComplete="off" id="formDespesa">
          <div className="row">
            <h4>Criar nova despesa</h4>
          </div>
          <div className="row">
            <label className="col l2 control-label" htmlFor="money">
              Valor
            </label>
            <div className="col l10">
              <input
                className="form-control"
                type="number"
                min="0"
                max="9999"
                step="0.01"
                id="money"
                autoFocus="autoFocus"
                ref={c => {
                  this.moneyInput = c;
                }}
                value={this.state.money}
                onChange={this.inputChanged}
                required="required"
              />
            </div>
          </div>
          <div className="row">
            <label className="col l2 control-label" htmlFor="date">
              Data
            </label>
            <div className="col l10">
              <input
                className="form-control"
                type="date"
                id="date"
                value={this.state.date}
                required="required"
                onChange={this.inputChanged}
              />
            </div>
          </div>
          <TypeChoice
            ref={c => {
              this.typeComponent = c;
            }}
            handleChange={this.typeChanged}
          />
          <div className="row">
            <label className="col l2 control-label" htmlFor="extra">
              Extra
            </label>
            <div className="col l10">
              <div className="switch">
                <label htmlFor="extra">
                  Não
                  <input
                    type="checkbox"
                    id="extra"
                    checked={this.state.extra}
                    onClick={this.checkboxChanged}
                  />
                  <span className="lever" />
                  Sim
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <label className="col l2 control-label" htmlFor="note">
              Descrição
            </label>
            <div className="col l10">
              <input
                className="form-control"
                type="text"
                id="note"
                value={this.state.note}
                onChange={this.inputChanged}
              />
            </div>
          </div>
          <div className="row">
            <div className="col l2 offset-l8">
              <button
                className="btn btn-raised"
                type="submit"
                onClick={this.handleSubmit}
              >
                Adicionar
              </button>
            </div>
          </div>
        </form>
        <div className="col l6">
          {this.state.expenses.length > 0
            ? <ListDespesa
                data={this.state.expenses}
                handleSave={this.handleSave}
              />
            : <h4>Sem despesas para guardar...</h4>}
        </div>
      </div>
    );
  }
}

export default AddDespesa;
