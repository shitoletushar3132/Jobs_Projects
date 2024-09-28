import React, { useContext, useEffect, useState } from "react";
import apiDataContext from "../context/contextData";
import showSuggestions from "../helper/searchSuggestions";
import handleSearch from "../helper/handleSearch";

const SearchBar = () => {
  const [show, setShow] = useState(false);

  const { setResults, setSuggestions, suggestions, query, setQuery } =
    useContext(apiDataContext);

  // Fetching data on Enter key press
  const fetchData = async () => {
    const api = await handleSearch(query);
    console.log(api);
    setResults(api.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching suggestions
  useEffect(() => {
    if (query) {
      const timer = setTimeout(async () => {
        const response = await showSuggestions(query);
        setSuggestions(response);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [query, setSuggestions]);

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-500 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setShow(false), 100)}
          onFocus={() => setShow(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setResults({});
              fetchData();
              setShow(false);
              // Call fetchData on Enter key press
            }
          }}
        />
        {show && suggestions && (
          <div className="absolute bg-slate-100 w-full rounded-b-md z-10">
            {suggestions.map((suggest, index) => (
              <li
                key={index}
                className="list-none cursor-pointer border-t p-1 hover:bg-slate-200 duration-800"
                onMouseDown={() => setQuery(suggest)}
              >
                {suggest}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
