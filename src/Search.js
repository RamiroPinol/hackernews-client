import React from 'react';

function Search({ children, value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  );
}

export default Search;
