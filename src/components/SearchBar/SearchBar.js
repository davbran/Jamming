import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
    let SearchTerm = event.target.value;
    localStorage.setItem('SearchTerm', SearchTerm);
  };

  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const search = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyPress={handleKeyPress}
        id="field"
      />
      <a id="btn" onClick={search}>
        SEARCH
      </a>
    </div>
  );
};

export default SearchBar;
