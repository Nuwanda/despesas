import React from 'react';
import PropTypes from 'prop-types';
import { Expense } from '../DB/schema';

const upSpan = <span>⏶</span>;
const downSpan = <span>⏷</span>;

const headers = [
  { text: 'Valor', id: 'money' },
  { text: 'Categoria', id: 'type' },
  { text: 'Data', id: 'date' },
  { text: 'Extra?', id: 'extra' },
  { text: 'Descrição', id: 'note' },
];

const styleCentered = { textAlign: 'center' };
const styleRight = { textAlign: 'right' };

function sortHelper(id, sortColumn, sortReverse) {
  if (sortColumn === id) {
    if (sortReverse) {
      return upSpan;
    }
    return downSpan;
  }
  return <span />;
}

const headerCell = function buildHeader(sortBy, sortColumn, sortReverse) {
  return entry => {
    const { id, text } = entry;
    return (
      <th key={id} style={styleCentered}>
        <span
          tabIndex={0}
          role="button"
          style={{ cursor: 'pointer' }}
          onClick={sortBy(id)}
        >
          {text}
          {sortHelper(id, sortColumn, sortReverse)}
        </span>
      </th>
    );
  };
};

function SimpleList(props) {
  const expenses = props.data.map(item => {
    const price = `€${item.money}`;
    return (
      <tr className="collection-item" key={item.id}>
        <td style={styleRight}>
          {price}
        </td>
        <td style={styleCentered}>
          {item.type}
        </td>
        <td style={styleCentered}>
          {item.date.toLocaleDateString()}
        </td>
        <td style={styleCentered}>
          {item.extra ? 'Sim' : 'Não'}
        </td>
        <td style={styleCentered}>
          {item.note}
        </td>
        {props.handleDelete &&
          <td>
            <span
              tabIndex={0}
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={props.handleDelete(item.id)}
            >
              <i className="material-icons">delete</i>
            </span>
          </td>}
      </tr>
    );
  });

  return (
    <div className="row">
      <div className="col l12">
        <table className="collection">
          <thead>
            <tr>
              {headers.map(
                headerCell(props.sortBy, props.sortColumn, props.sortReverse),
              )}
              {props.handleDelete && <th />}
            </tr>
          </thead>
          <tbody>
            {expenses}
          </tbody>
          {props.handleSave &&
            <tfoot>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td style={styleRight}>
                  <button className="btn btn-raised" onClick={props.handleSave}>
                    Guardar
                  </button>
                </td>
              </tr>
            </tfoot>}
        </table>
      </div>
    </div>
  );
}

SimpleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Expense)).isRequired,
  sortBy: PropTypes.func.isRequired,
  sortColumn: PropTypes.string,
  sortReverse: PropTypes.bool,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
};

SimpleList.defaultProps = {
  handleSave: null,
  handleDelete: null,
};

export default SimpleList;
