import React from 'react';
import PropTypes from 'prop-types';
import ColumnChart from './Charts/column-chart';
import DBUtil from './DB/db-util';

const spinner = (
  <div className="preloader-wrapper small active">
    <div className="spinner-layer spinner-green-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  </div>
);

class DisplayExpenses extends React.Component {
  constructor(props) {
    super(props);
    // TODO: create an input to set this and other filters
    this.minMonth = 2;
    this.maxMonth = 6;
    this.state = { hasData: false };
  }

  componentWillMount() {
    DBUtil.query({
      date: {
        min: new Date(2017, this.minMonth, 1),
        max: new Date(2017, this.maxMonth, 31),
      },
    }).then(data => this.setState({ hasData: true, data }));
  }

  render() {
    return (
      <div>
        {this.state.hasData
          ? <ColumnChart
              data={this.state.data}
              minMonth={this.minMonth}
              maxMonth={this.maxMonth}
            />
          : spinner}
      </div>
    );
  }
}

DisplayExpenses.propTypes = {
  minMonth: PropTypes.number.isRequired,
  maxMonth: PropTypes.number.isRequired,
};

export default DisplayExpenses;
