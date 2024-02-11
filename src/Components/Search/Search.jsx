import React from 'react';
import {
  InputGroup, Input, InputGroupText,
} from 'reactstrap';
import styles from './style.module.scss';

function Search({ value, onChange, searchButton = null }) {
  return (
    <InputGroup>
      <InputGroupText className="bg-light border-0">
        <i className="fas fa-search" />
      </InputGroupText>
      <Input
        type="text"
        name="query"
        className="form-control border-0 bg-light"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {searchButton && (
        <Input
          className={styles.searchButton}
          type="button"
          onClick={searchButton.action}
          value={searchButton.text}
        />
      )}
    </InputGroup>
  );
}

export default Search;
