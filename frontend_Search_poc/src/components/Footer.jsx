import React, { useContext } from "react";
import apiDataContext from "../context/contextData";

const Footer = () => {
  const { results, suggestions, query, setQuery } = useContext(apiDataContext);

  return (
    <div className="p-3">
      {/* Grid with explicit column control */}
      {query && (
        <h2 className="text-xl font-semibold">Related Searches for {query}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {suggestions?.map((s, index) => (
          <p
            key={index}
            className="p-2 px-4 bg-slate-100 rounded-md shadow-sm cursor-pointer"
            onClick={() => {
              setQuery(s);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {s}
          </p>
        ))}
      </div>

      <p className="text-center p-4 text-md text-slate-600">2024 Search POC</p>
    </div>
  );
};

export default Footer;
