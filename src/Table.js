import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import TableHeader from './TableHeader';

function Table({ list, onDismiss, sortKey, onSort, sortBy }) {
  return (
    <div className="table">

      <TableHeader onSort={onSort} />

      {sortBy(list, sortKey).map(item =>
        <div key={item.objectID} className="table-row">
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >Dismiss
            </Button>
          </span>
        </div>)}
    </div>
  );
}

Table.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.func.isRequired,
};

export default Table;
