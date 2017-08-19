import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import DisplayExpenses from './MainDisplay/display-expenses';
import AddDespesa from './AddDespesa/add-despesa';
import ImportWrapper from './Import/import-wrapper';
import NavBar from './MainDisplay/nav-bar';
import DBUtil from './DB/db-util';

window.db = DBUtil;

function Root(props) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col l12">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Root.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

function Routing() {
  return (
    <BrowserRouter>
      <Root>
        <Route exact path="/" component={DisplayExpenses} />
        <Route path="/add" component={AddDespesa} />
        <Route path="/import" component={ImportWrapper} />
      </Root>
    </BrowserRouter>
  );
}

ReactDOM.render(<Routing />, document.getElementById('root'));
