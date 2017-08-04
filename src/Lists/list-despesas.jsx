import React from 'react';
import PropTypes from 'prop-types';
import { Expense } from '../DB/schema';

function ListDespesa({ data, handleSave }) {
  const styleCentered = { textAlign: 'center' };
  const styleRight = { textAlign: 'right' };

  const expenses = data.map((item, index) => {
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
              <th style={styleCentered}>Valor</th>
              <th style={styleCentered}>Categoria</th>
              <th style={styleCentered}>Data</th>
              <th style={styleCentered}>Extra?</th>
              <th style={styleCentered}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {expenses}
          </tbody>
          {handleSave &&
            <tfoot>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td style={styleRight}>
                  <button className="btn btn-raised" onClick={handleSave}>
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

ListDespesa.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Expense)).isRequired,
  handleSave: PropTypes.func,
};

export default ListDespesa;
