import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import apiDataContext from "./context/contextData";

const App = () => {
  const [results, setResults] = useState({});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("Show All");

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <apiDataContext.Provider
        value={{
          results,
          setResults,
          query,
          setQuery,
          suggestions,
          setSuggestions,
          filter,
          setFilter,
        }}
      >
        <Header />
        <Body />

        <Footer />
      </apiDataContext.Provider>
    </div>
  );
};

export default App;
