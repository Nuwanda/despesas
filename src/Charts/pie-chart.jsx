import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Types } from '../DB/schema';
import DB from '../DB/db-util';

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

class PieWrapper extends React.Component {
  constructor(props) {
    super(props);
    // javascript date.getMonth() is 0..11
    this.month = props.month - 1;

    this.options = {
      title: { display: true, text: Months[this.month], fontSize: 16 },
      legend: {
        labels: {
          fontSize: 13,
          padding: 8,
          boxWidth: 30,
        },
      },
    };

    this.state = { data: {} };
  }

  componentDidMount() {
    const data = this.createDatasets();
    data.then(val => {
      console.log('Got a dataset:', val);
      this.setState({
        data: val,
        isLoaded: true,
      });
    });
  }

  // calculates sums for each type of expense in this month
  calcSums(data) {
    const typeSums = {
      [Types[0]]: 0,
      [Types[1]]: 0,
      [Types[2]]: 0,
      [Types[3]]: 0,
      [Types[4]]: 0,
    };

    data.forEach(item => {
      if (item.date.getMonth() === this.month && !item.extra) {
        // converting x.yy to xyy because js math is :confused:
        typeSums[item.type] += item.money * 100;
      }
    });

    const dataset = {
      labels: Types,
      datasets: [
        {
          // reversing the math hack
          data: [
            typeSums[Types[0]] / 100,
            typeSums[Types[1]] / 100,
            typeSums[Types[2]] / 100,
            typeSums[Types[3]] / 100,
            typeSums[Types[4]] / 100,
          ],
          backgroundColor: [
            '#fe6770',
            '#9ce0a3',
            '#8b22d4',
            '#febd7d',
            '#ffff66',
          ],
        },
      ],
    };

    console.log('calculated dataset: ', dataset);
    return dataset;
  }

  createDatasets() {
    // returns a promise "dataset" that will eventually resolve with the values
    // calculated from db query
    const dataset = new Promise(resolve => {
      const dbData = DB.getAll();
      dbData.then(val => {
        console.log('got values from db: ', val);
        resolve(this.calcSums(val));
      });
    });
    return dataset;
  }

  render() {
    return (
      <Pie
        options={this.options}
        width={200}
        height={200}
        data={this.state.data}
        cutoutPercentage={25}
      />
    );
  }
}

PieWrapper.propTypes = {
  month: PropTypes.number.isRequired,
};

export default PieWrapper;
