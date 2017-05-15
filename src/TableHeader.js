import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


const TableHeader = ({ onSort, sortKey, isSortReverse }) => {
  // Returns string template to add classes to active button
  const classStr = string => `button-inline ${sortKey === string ? 'active' : ''}
  ${isSortReverse ? 'reverse' : ''}`;

  return (
    <div className="table-header">
      <span>
        <Button
          onClick={() => onSort('title')}
          className={classStr('title')}
        >Title
        </Button>
      </span>
      <span>
        <Button
          onClick={() => onSort('author')}
          className={classStr('author')}
        >Author
        </Button>
      </span>
      <span>
        <Button
          onClick={() => onSort('num_comments')}
          className={classStr('num_comments')}
        >Comments
        </Button>
      </span>
      <span>
        <Button
          onClick={() => onSort('points')}
          className={classStr('points')}
        >Points
        </Button>
      </span>
      <span>
        Archive
      </span>
    </div>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSortReverse: PropTypes.bool.isRequired,
};

export default TableHeader;
