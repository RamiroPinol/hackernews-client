import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import TableHeader from './TableHeader';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.sortBy = this.sortBy.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  // Method to change sortKey
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  // Method to sort list of stories. SortBy(ARRAY, SORTING_TARGET)
  // SORTING_TARGET (string) must be one of the 5 options:
  // "NONE", "title", "author", "num_comments" or "points"
  sortBy(array, sortKey) {
    if (sortKey === 'NONE') {
      return array;
    } else if (sortKey === 'title' || sortKey === 'author') {
      return array.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    } else if (sortKey === 'num_comments' || sortKey === 'points') {
      return array.sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1));
    }
    return console.error('ERROR: sortKey must be "title", "author", "num_comments" or "points"');
  }

  render() {
    const sortedList = this.sortBy(this.props.list, this.state.sortKey);
    const reverseSortedList =
      this.state.isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">

        <TableHeader
          onSort={this.onSort}
          sortKey={this.state.sortKey}
          isSortReverse={this.state.isSortReverse}
        />

        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <div className="item-title">
              <a href={item.url}>{item.title}</a>
            </div>
            <div className="item-info">
              <span className="item-author">Author: {item.author}</span>
              <span>|</span>
              <span className="item-comments">{item.num_comments} comments</span>
              <span className="item-points">{item.points} points</span>
            </div>
            <Button
              className="dismiss-button"
              onClick={() => this.props.onDismiss(item.objectID)}
            ><i className="fa fa-times" aria-hidden="true" />
            </Button>
          </div>)}
      </div>
    );
  }
}

Table.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default Table;
