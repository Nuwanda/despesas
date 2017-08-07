import React from 'react';
import ImportJSON from './import-json';
import ImportSheet from './import-sheet';
import DBUtil from '../DB/db-util';

function ImportWrapper() {
  return (
    <div className="row">
      <div className="col l12">
        <ImportJSON />
      </div>
      <div className="col l12">
        <ImportSheet />
      </div>
      <div className="col l12">
        <button className="btn btn-raised" onClick={DBUtil.download}>
          Export Database
        </button>
      </div>
    </div>
  );
}

export default ImportWrapper;
