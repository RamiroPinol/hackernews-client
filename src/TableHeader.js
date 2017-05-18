import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


const TableHeader = ({ onSort, sortKey, isSortReverse }) => {
  // Returns string template to add classes to active button
  const classStr = string => `sort-button ${sortKey === string ? 'active' : ''}
  ${isSortReverse ? 'reverse' : ''}`;

  return (
    <div className="table-header">SORT BY:
      <Button
        onClick={() => onSort('title')}
        className={classStr('title')}
      >Title
      </Button>
      <Button
        onClick={() => onSort('author')}
        className={classStr('author')}
      >Author
      </Button>
      <Button
        onClick={() => onSort('num_comments')}
        className={classStr('num_comments')}
      >Comments
      </Button>
      <Button
        onClick={() => onSort('points')}
        className={classStr('points')}
      >Points
      </Button>
    </div>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSortReverse: PropTypes.bool.isRequired,
};

export default TableHeader;
