import React from 'react';
import { Link } from 'react-router-dom';

const style = {
  fontSize: '38px',
};

function NavBar() {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper teal darken-1">
          <Link to="/" className="brand-logo">
            <i style={style} className="material-icons">
              attach_money
            </i>Despesas
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">
                <i style={style} className="large material-icons">
                  insert_chart
                </i>
              </Link>
            </li>
            <li>
              <Link to="/add">
                <i style={style} className="large material-icons">
                  add_circle
                </i>
              </Link>
            </li>
            <li>
              <Link to="/import">
                <i style={style} className="large material-icons">
                  file_upload
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
