import React from 'react';
import XLSX from 'xlsx';
import parseSheet from './sheet-parser';
import DBUtil from '../DB/db-util';

class ImportSheet extends React.Component {
  static handleImport(evt) {
    const file = evt.target.files[0];

    // Small hack to make the filename appear and highlight it,
    // since materializecss isn't cutting it
    const pathInput = document.getElementById('path');
    pathInput.value = file.name;
    pathInput.classList.add('valid');

    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const expenses = parseSheet(workbook);

      // Populate the db with the results from the sheet,
      // since spreadsheets don't have primary keys we can't really tell if
      // we're importing duplicate expenses, it's up to the user
      const populateRes = DBUtil.populate(expenses);
      populateRes
        .then(console.log('Populate DB was successful'))
        .catch(err => console.warn(err));
    };

    reader.readAsBinaryString(file);
  }

  render() {
    return (
      <form action="#">
        <div className="file-field input-field">
          <div className="btn">
            <span>FILE</span>
            <input type="file" onChange={ImportSheet.handleImport} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              id="path"
              placeholder="Spreadsheet a importar"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ImportSheet;
