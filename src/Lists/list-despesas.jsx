import React from 'react';
import PropTypes from 'prop-types';
import SimpleList from './simple-list';
import { Expense } from '../DB/schema';

function byMoney(e1, e2) {
  return e2.money - e1.money;
}

function byType(e1, e2) {
  return e1.type.localeCompare(e2.type);
}

function byDate(e1, e2) {
  if (e1.date > e2.date) {
    return -1;
  }
  if (e2.date > e1.date) {
    return 1;
  }
  return 0;
}

function byExtra(e1, e2) {
  if (e1.extra === e2.extra) {
    return 0;
  }
  if (e1.extra) {
    return 1;
  }
  return -1;
}

function byNote(e1, e2) {
  if (!e1.note) {
    return -1;
  }
  if (!e2.note) {
    return 1;
  }
  return e1.note.localeCompare(e2.note);
}

function sortWrapper(data, reverse) {
  return compare => {
    const sorted = data.slice();
    sorted.sort(compare);
    if (reverse) {
      sorted.reverse();
    }
    return sorted;
  };
}

function sortBy(by, data, reverse) {
  const sort = sortWrapper(data, reverse);
  switch (by) {
    case 'money':
      return sort(byMoney);
    case 'type':
      return sort(byType);
    case 'date':
      return sort(byDate);
    case 'extra':
      return sort(byExtra);
    case 'note':
      return sort(byNote);
    default:
      console.error("Can't sort by: ", by);
      return [];
  }
}

class ListDespesa extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data.slice(), sortedBy: 'date', reverse: true };
    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps({ data }) {
    this.setState(prev => {
      const sortedData = sortBy(prev.sortedBy, data, prev.reverse);
      return { data: sortedData };
    });
  }

  sort(sortedBy) {
    return () => {
      this.setState(prev => {
        let reverse = prev.reverse;
        if (prev.sortedBy === sortedBy) {
          reverse = !reverse;
        } else {
          reverse = false;
        }
        const data = sortBy(sortedBy, prev.data, reverse);
        return { data, reverse, sortedBy };
      });
    };
  }

  render() {
    return (
      <SimpleList
        handleDelete={this.props.handleDelete}
        sortBy={this.sort}
        data={this.state.data}
        sortColumn={this.state.sortedBy}
        sortReverse={this.state.reverse}
        handleSave={this.props.handleSave}
      />
    );
  }
}

ListDespesa.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Expense)).isRequired,
  handleSave: PropTypes.func,
  handleDelete: PropTypes.func,
};

ListDespesa.defaultProps = {
  handleSave: null,
  handleDelete: null,
};

export default ListDespesa;
