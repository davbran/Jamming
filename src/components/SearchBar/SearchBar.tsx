import React, { useState } from 'react';
import './SearchBar.css';
import { Track } from '../../util/CommonTypes.types';

interface SearchBarProps {
  searchTracks:(searchTerm: string) => Track[] | void;
}

const SearchBar:React.FC<SearchBarProps> = ({ searchTracks }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    let searchTerm = event.target.value;
    localStorage.setItem('SearchTerm', searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchTracks(searchTerm);
    }
  };

  const search = () => {
    searchTracks(searchTerm);
  };

  return (
    <div className="searchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyPress={handleKeyPress}
        id="field"
      />
      <button className="searchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
