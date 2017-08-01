import React from 'react';
import PieChart from './pie-chart';

function MonthlySplitsChart() {
  return (
    <div>
      <div className="row">
        <div className="col l6">
          <PieChart month={3} />
        </div>
        <div className="col l6">
          <PieChart month={4} />
        </div>
      </div>
      <div className="row">
        <div className="col l6">
          <PieChart month={5} />
        </div>
        <div className="col l6">
          <PieChart month={6} />
        </div>
      </div>
    </div>
  );
}

export default MonthlySplitsChart;
