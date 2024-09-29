import React, { useContext, useEffect, useState } from "react";
import apiDataContext from "../context/contextData";

const Body = () => {
  const { results, filter, setFilter } = useContext(apiDataContext);

  useEffect(() => {}, [setFilter, results]);

  return (
    <div className="px-3 my-3">
      {/* Check if results object is empty */}
      {Object.keys(results).length === 0 ? (
        <h1 className="text-center font-bold text-2xl">Loading....</h1>
      ) : (
        <>
          {/* Rendering videos if "Show All" or "videos" is selected */}
          {(filter === "Show All" || filter === "videos") && (
            <div className="shadow-sm rounded-md">
              <h2 className="font-bold text-xl">Videos</h2>
              {/* Safely accessing YouTube results */}
              {results?.youtube?.map((video) => (
                <div key={video.id} className="my-2 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-36">
                    <iframe
                      className="rounded-md w-full h-full"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.snippet.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="p-3 flex flex-col justify-between w-full md:w-2/3">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      className="text-[#4007A2] font-medium overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {video.snippet.title}
                    </a>

                    <p className="text-[#4007A2] text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                      {video.snippet.description}
                    </p>
                    <p className="text-green-800">
                      Date: {video.snippet.publishedAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rendering articles if "Show All" or "articles" is selected */}
          {(filter === "Show All" || filter === "articles") && (
            <div>
              <h2 className="font-bold text-xl">Articles</h2>
              {results?.google?.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link?.link}
                >
                  <div className="p-3 shadow-sm mt-5">
                    <div className="flex">
                      <span className="bg-gray-300 p-3 rounded-md">
                        {link?.displayLink?.[0]}
                      </span>
                      <div className="ml-2">
                        <p className="text-ellipsis line-clamp-1">
                          {link?.title}
                        </p>
                        <a target="_blank" className="text-[#4007A2]">
                          {link?.displayLink}
                        </a>
                      </div>
                    </div>
                    <div className="text-slate-600">{link?.snippet}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Body;
