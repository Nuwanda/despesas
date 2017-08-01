import { Expense } from './schema';

const DBUtil = {
  open() {
    return indexedDB.open('expensesDB', 3);
  },

  create() {
    const result = new Promise((resolve, reject) => {
      const request = DBUtil.open();

      request.onerror = evt => {
        reject(`DB error: ${evt.target.errorCode}`);
      };

      request.onupgradeneeded = function migrate(evt) {
        const db = evt.target.result;
        const expenseStore = db.createObjectStore('expenses', {
          autoIncrement: true,
        });

        expenseStore.createIndex('type', 'type', { unique: false });
        expenseStore.createIndex('date', 'date', { unique: false });
      };

      request.onsuccess = () => resolve(request.result);
    });

    return result;
  },

  populate(data) {
    const result = new Promise((resolve, reject) => {
      const request = DBUtil.open();

      request.onsuccess = function opened(evt) {
        const db = evt.target.result;
        const trans = db.transaction(['expenses'], 'readwrite');

        trans.onerror = transEvt =>
          reject(`Transaction error: ${transEvt.target.errorCode}`);
        trans.oncomplete = transEvt => resolve(transEvt);

        const store = trans.objectStore('expenses');
        data.map(item => store.add(item));
      };

      request.onerror = evt => reject(`Open DB error: ${evt.target.errorCode}`);
    });

    return result;
  },

  getAll() {
    const result = new Promise((resolve, reject) => {
      const request = DBUtil.open();

      request.onsuccess = function opened(evt) {
        const db = evt.target.result;
        const trans = db.transaction(['expenses']);
        const cursorReq = trans.objectStore('expenses').openCursor();

        const values = [];

        cursorReq.onsuccess = cursorEvt => {
          const cursor = cursorEvt.target.result;
          if (cursor) {
            const expense = new Expense(cursor.value);
            values.push(expense);
            cursor.continue();
          }
        };

        cursorReq.onerror = cursorEvt => {
          reject(`Cursor error: ${cursorEvt.target.errorCode}`);
        };

        trans.oncomplete = () => resolve(values);
      };
    });

    return result;
  },

  // args: money is {min: number, max: number}
  // type is one of the types, extra is a bool, note is a string to be searched for
  query({ money, date, type, extra, note }) {
    const result = new Promise(resolve => {
      this.getAll().then(data => {
        const filtered = data.filter(item => {
          let moneyCond;
          if (money) {
            moneyCond = item.money >= money.min && item.money <= money.max;
          } else {
            moneyCond = true;
          }

          let typeCond;
          if (type) {
            typeCond = item.type === type;
          } else {
            typeCond = true;
          }

          let dateCond;
          if (date) {
            dateCond = item.date >= date.min && item.date <= date.max;
          } else {
            dateCond = true;
          }

          let extraCond;
          if (extra !== undefined) {
            extraCond = item.extra === extra;
          } else {
            extraCond = true;
          }

          let noteCond;
          if (note) {
            if (!item.note) {
              return false;
            }
            noteCond = item.note.indexOf(note) !== -1;
          } else {
            noteCond = true;
          }

          return moneyCond && typeCond && dateCond && extraCond && noteCond;
        });
        resolve(filtered);
      });
    });
    return result;
  },

  download() {
    this.getAll().then(data => {
      const json = JSON.stringify(data);
      const uri = encodeURIComponent(json);
      const node = document.createElement('a');
      node.setAttribute('href', `data:text/plain;charset=utf-8,${uri}`);
      node.setAttribute('download', 'expensesDB.txt');
      node.setAttribute('style', 'display: none');
      document.body.appendChild(node);
      node.click();
      node.parentNode.removeChild(node);
    });
  },
};

DBUtil.insert = DBUtil.populate;

export default DBUtil;
