import React from 'react';

function SearchBox({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text border-0 p-3">
        <i className="fas fa-search" />
      </span>
      <input
        type="text"
        name="query"
        className="form-control border-0 bg-light p-4"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchBox;
