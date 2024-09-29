import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import apiDataContext from "../context/contextData";

const Header = () => {
  const { filter, setFilter } = useContext(apiDataContext);

  useEffect(() => {}, [filter]);

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex border py-3 px-3 justify-between items-center w-full shadow-md bg-white ">
      <div className="text-orange-300 font-semibold text-xl">Search POC</div>
      <div className="w-1/2 flex justify-between ">
        <SearchBar />
        <select
          title="Filter"
          name="filter"
          value={filter}
          onChange={handleSelectChange}
          className="bg-gray-200 rounded-full px-2 py-1 ml-2 text-xs"
        >
          <option>Show All</option>
          <option>videos</option>
          <option>articles</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
