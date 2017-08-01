import { Types, Expense } from '../DB/schema';

// sheet structure
// Columns are letters, Rows are numbers, Cells are a combination of both
const s = {
  date: 'A2',
  [Types[0]]: 'B',
  [Types[1]]: 'C',
  [Types[2]]: 'D',
  [Types[3]]: 'E',
  [Types[4]]: 'F',
  normalStart: 2,
  normalEnd: 21,
  extrasStart: 23,
  extrasEnd: 26,
  extraTotals: 27,
  typeTotals: 28,
  total: 'A31',
};

class ExpenseBuilder {
  constructor() {
    this.date = null;
    this.type = null;
    this.extra = null;
  }

  // Cells have 'v' fields with the raw values, comments are inside an array in a 'c' field,
  // and then a 't' field inside of that seems to have the most legible version of the text
  build(cell) {
    if (this.date === null || this.type === null || this.extra === null) {
      throw new Error('Illegal Expense');
    }

    const money = cell.v;
    const note = cell.c ? cell.c[0].t : null;
    const expense = new Expense({
      money,
      date: this.date,
      type: this.type,
      extra: this.extra,
      note,
    });
    return expense;
  }
}

function parsePage(sheet) {
  const expenses = [];
  const expense = new ExpenseBuilder();
  expense.date = sheet[s.date].v;

  for (const type of Types) {
    const col = s[type];
    expense.type = type;

    for (let row = s.normalStart; row < s.normalEnd; row += 1) {
      const cell = sheet[`${col}${row}`];
      expense.extra = false;

      if (cell) {
        expenses.push(expense.build(cell));
      }
    }

    for (let row = s.extrasStart; row < s.extrasEnd; row += 1) {
      const cell = sheet[`${col}${row}`];
      expense.extra = true;

      if (cell) {
        expenses.push(expense.build(cell));
      }
    }
  }

  return expenses;
}

function parseSheet(book) {
  const sheets = book.Sheets;
  let expenses = [];

  // Spreadsheets are divided by months (a month per sheet), we parse each of them seperately
  for (const sheet in sheets) {
    if (Object.prototype.hasOwnProperty.call(sheets, sheet)) {
      const monthExpenses = parsePage(sheets[sheet]);
      expenses = expenses.concat(monthExpenses);
    }
  }

  return expenses;
}

export default parseSheet;
