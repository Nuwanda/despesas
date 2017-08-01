import { createStore } from 'redux';

// Doesn't seem like this will ever actually be used, keeping it around for a bit anyway
const TypeEnum = {
  CARRO: 'Carro',
  CINEMA: 'Cinema',
  COMIDA: 'Comida',
  PHONE: 'Phone',
  MISC: 'Misc',
};

const Types = Object.values(TypeEnum);

// Using this as a db schema too
class Expense {
  constructor({ money, date, type, extra, note }) {
    this.money = parseFloat(money);
    this.date = new Date(date);
    this.type = type;
    this.extra = extra;
    this.note = note;
  }
}

// Redux initial configs
const initial = {
  expenses: [],
};

function transition(state, action) {
  return action ? state : state;
}

const store = createStore(transition, initial);

export { Types, TypeEnum, store, Expense };
