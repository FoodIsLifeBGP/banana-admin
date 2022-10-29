import React, { useState } from 'react';
import Icon from '../Icon';
import styles from './style.module.css';

function Search() {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.searchComponent}>
      <div className={styles.vector}>
        <Icon name="search" />
      </div>
      <input
        id="searchBar"
        name="searchBar"
        className={styles.searchBar}
        type="search"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
