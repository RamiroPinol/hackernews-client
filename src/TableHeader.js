import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TableHeader = ({ onSort }) =>
  <div className="table-header">
    <span>
      <Button
        onClick={() => onSort('title')}
        className="button-inline"
      >Title
      </Button>
    </span>
    <span>
      <Button
        onClick={() => onSort('author')}
        className="button-inline"
      >Author
      </Button>
    </span>
    <span>
      <Button
        onClick={() => onSort('num_comments')}
        className="button-inline"
      >Comments
      </Button>
    </span>
    <span>
      <Button
        onClick={() => onSort('points')}
        className="button-inline"
      >Points
      </Button>
    </span>
    <span>
      Archive
    </span>
  </div>;

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
