import React from 'react';
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
      const data = JSON.parse(e.target.result);
      const parsed = data.map(item =>
        Object.assign({}, item, { money: parseFloat(item.money) }),
      );

      // In case the db is already created this does nothing
      const createRes = DBUtil.create();
      createRes
        .then(db => console.log('DB openened: ', db))
        .catch(err => console.warn(err));

      const populateRes = DBUtil.populate(parsed);
      populateRes
        .then(console.log('Populate DB was successful'))
        .catch(err => console.warn(err));
    };

    reader.readAsText(file, 'utf-8');
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
              placeholder="Ficheiro JSON a importar"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ImportSheet;
