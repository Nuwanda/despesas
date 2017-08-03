import React from 'react';
import FilterControls from './filter-controls';
import ColumnChart from '../Charts/column-chart';
import DBUtil from '../DB/db-util';

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

function buildDateQuery({ min, max }) {
  if (min && max) {
    return {
      min: new Date(min),
      max: new Date(max),
    };
  }
  if (min && !max) {
    return { min: new Date(min), max: new Date(8640000000000000) };
  }
  if (!min && max) {
    return { min: new Date(-8640000000000000), max: new Date(max) };
  }
  return null;
}

function buildMoneyQuery({ min, max }) {
  if (min && max) {
    return {
      min: parseFloat(min),
      max: parseFloat(max),
    };
  }
  if (min && !max) {
    return { min: parseFloat(min), max: 9999 };
  }
  if (!min && max) {
    return { min: 0, max: parseFloat(max) };
  }
  return null;
}

function buildExtraQuery(extra) {
  switch (extra) {
    case 'Normais':
      return false;
    case 'Extraordinárias':
      return true;
    default:
      return undefined;
  }
}

function buildQueryOptions(filters) {
  const options = { ...filters };
  options.date = buildDateQuery(filters.date);
  options.money = buildMoneyQuery(filters.money);
  options.extra = buildExtraQuery(filters.extra);
  console.log(options);
  return options;
}

class DisplayExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.filter = null;
    this.gotFilter = this.gotFilter.bind(this);
    this.state = { hasData: false };
  }

  componentWillMount() {
    DBUtil.getAll().then(data => this.setState({ hasData: true, data }));
  }

  gotFilter(filter) {
    const filterJSON = JSON.stringify(filter);
    if (this.filter !== filterJSON) {
      this.filter = filterJSON;
      const queryOptions = buildQueryOptions(filter);
      DBUtil.query(queryOptions).then(data =>
        this.setState({ hasData: true, data }),
      );
    }
  }

  render() {
    return (
      <div>
        <FilterControls onChange={this.gotFilter} />
        {this.state.hasData ? <ColumnChart data={this.state.data} /> : spinner}
      </div>
    );
  }
}

export default DisplayExpenses;
