import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, query, setQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
