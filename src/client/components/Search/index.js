import React, { useState } from "react";
import "./search.css";

const Search = ({ search, onSearch, onClear }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div className="search">
      <label htmlFor="toDoListSearch">Search</label>
      <input value={search} id="toDoListSearch" onChange={handleSearch} />
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default Search;
