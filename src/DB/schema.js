import { createStore } from 'redux';

// Doesn't seem like this will ever actually be used, keeping it around for a bit anyway
const TypeEnum = {
  CARRO: 'Carro',
  CINEMA: 'Cinema',
  COMIDA: 'Comida',
  PHONE: 'Phone',
  CASA: 'Casa',
  MISC: 'Misc',
};

const Types = Object.values(TypeEnum);

/* eslint-disable */
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] &
        (15 >> (c / 4)))).toString(16),
  );
}
/* eslint-enable */

// Using this as a db schema too
class Expense {
  constructor({ money, date, type, extra, note }) {
    this.money = parseFloat(money);
    this.date = new Date(date);
    this.type = type;
    this.extra = extra;
    this.note = note;
    this.id = uuidv4();
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
