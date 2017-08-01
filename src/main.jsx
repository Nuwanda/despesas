import React from 'react';
import ReactDOM from 'react-dom';
import DisplayExpenses from './display-expenses';
import DBUtil from './DB/db-util';

window.db = DBUtil;

const Root = (
  <div className="container">
    <div className="section">
      <div className="row">
        <div className="col l12">
          <DisplayExpenses />
        </div>
      </div>
    </div>
  </div>
);

ReactDOM.render(Root, document.getElementById('root'));
