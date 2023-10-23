import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div class="input-group">
      <span class="input-group-text border-0 p-3"><i class="fas fa-search"></i></span>
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
};

export default SearchBox;
