import React from 'react';
import PropTypes from 'prop-types';
import { Expense } from '../DB/schema';

function SimpleList(props) {
  const styleCentered = { textAlign: 'center' };
  const styleRight = { textAlign: 'right' };

  const expenses = props.data.map((item, index) => {
    const price = `€${item.money}`;
    return (
      <tr className="collection-item" key={index}>
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
      </tr>
    );
  });

  return (
    <div className="row">
      <div className="col l12">
        <table className="collection">
          <thead>
            <tr>
              <th style={styleCentered}>
                <span
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={props.sortBy('money')}
                >
                  Valor
                </span>
              </th>
              <th style={styleCentered}>
                <span
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={props.sortBy('type')}
                >
                  Categoria
                </span>
              </th>
              <th style={styleCentered}>
                <span
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={props.sortBy('date')}
                >
                  Data
                </span>
              </th>
              <th style={styleCentered}>
                <span
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={props.sortBy('extra')}
                >
                  Extra?
                </span>
              </th>
              <th style={styleCentered}>
                <span
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={props.sortBy('note')}
                >
                  Descrição
                </span>
              </th>
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
  handleSave: PropTypes.func,
};

export default SimpleList;
