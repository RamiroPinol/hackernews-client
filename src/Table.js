import React from 'react';
import Button from './Button';

function Table({ list, onDismiss }) {
  return (
    <div className="table">
      {list.map(item =>
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
            >
              Dismiss
            </Button>
          </span>
        </div>)}
    </div>
  );
}

export default Table;
