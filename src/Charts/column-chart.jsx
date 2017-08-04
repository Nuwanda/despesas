import React from 'react';
import ReactHighCharts from 'react-highcharts';
import PropTypes from 'prop-types';
import theme from './dark-unica-theme';
import { Types, Expense } from '../DB/schema';

const Months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const config = {
  chart: {
    type: 'column',
  },
  exporting: {
    enabled: false,
  },
  yAxis: {
    min: 0,
    title: {
      text: 'valor (€)',
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>€{point.y:.1f}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      borderWidth: 0,
      events: {
        click: e => console.log(e),
      },
    },
  },
};

function reduceType(type, minMonth) {
  return (acc, item) => {
    if (item.type === type) {
      const newAcc = acc.slice();
      const index = item.date.getMonth() - minMonth;
      newAcc[index] += item.money * 100;
      return newAcc;
    }
    return acc;
  };
}

function setMinAndMaxMonths(acc, expense) {
  const expMonth = expense.date.getMonth();
  const result = { ...acc };

  if (expMonth < acc.minMonth) {
    result.minMonth = expMonth;
  }
  if (expMonth > acc.maxMonth) {
    result.maxMonth = expMonth;
  }

  return result;
}

function formatData(data) {
  if (data.length === 0) {
    return { ...config };
  }

  // calculate min and max months, have to know this to build everything else
  const { minMonth, maxMonth } = data.reduce(setMinAndMaxMonths, {
    minMonth: 11,
    maxMonth: 0,
  });

  // setting up the array with one position per month
  const accLength = maxMonth - minMonth;
  const acc = new Array(accLength + 1).fill(0);

  // this will have the shape of {'Carro': [xxx,yyy,zzz]}, one array position per month
  const series = {};
  Types.map(type => {
    const typeSum = data.reduce(reduceType(type, minMonth), acc);
    series[type] = typeSum;
    return typeSum;
  });

  // turn the previous object into the highcharts accepted format of:
  // [{name: 'Carro', data: [xxx,yyy,zzz]}, {...}]
  const formattedSeries = [];
  Object.entries(series).forEach(([type, sum]) => {
    formattedSeries.push({ name: type, data: sum.map(total => total / 100) });
  });

  // Calculate total expenses for chart title
  const totalSum = formattedSeries.reduce(
    (total, item) =>
      total + item.data.reduce((partial, sum) => sum + partial, 0),
    0,
  );

  // the xAxis labels, highcharts expects an array
  const categories = [];
  for (let i = minMonth; i <= maxMonth; i += 1) {
    categories.push(Months[i]);
  }

  return {
    ...config,
    series: formattedSeries,
    xAxis: { categories },
    title: { text: `Total despesas: €${totalSum}` },
  };
}

class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { config: formatData(props.data) };
  }

  componentWillMount() {
    ReactHighCharts.Highcharts.setOptions(theme);
  }

  componentWillReceiveProps(props) {
    this.setState({ config: formatData(props.data) });
  }

  render() {
    return <ReactHighCharts config={this.state.config} />;
  }
}

ColumnChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Expense)),
};

export default ColumnChart;
