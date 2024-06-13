import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, search } from "../../features/search/searchSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchBar = ({
  searchError,
  searchLoading,
  searchrezults,
  setFilteredProjects,
  projects,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const handleClick = (result) => {
    setVisibility("hidden");
    setInput(result);
    setFilteredProjects(projects.filter((project) => result === project.name));
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
        setVisibility("hidden");
      dispatch(clearSearch());
      setFilteredProjects(projects);
      return;
    }
    dispatch(search(value));
    setVisibility("visible");
  };

  return (
    <div className="p-4 relative">
      <div className="relative sm:w-[25rem] live-search-container">
        <input
          type="text"
          placeholder="Search projects by name"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className="placeholder-gray-900 sm:text-2xl border border-black p-4 rounded-xl w-full hover:border-blue-500"
        />
        <i className="bx bx-search text-3xl absolute top-1/2 transform -translate-y-1/2 right-4" />
      </div>

      <div className={`${visibility} live-search-container w-[25rem] h-[200px] shadow-xl px-2 border-2 bg-white z-10 overflow-auto rounded-xl absolute top-[5.5rem]`}>
        <div className="bg-white flex flex-col mt-4 overflow-y-auto z-10">
          {searchLoading && <Skeleton className="p-4 mt-4" count={3} />}
          {!searchLoading && searchError && <div>{searchError}</div>}
          {!searchLoading &&
            !searchError &&
            searchrezults &&
            searchrezults.length > 0 &&
            searchrezults.map((rezult) => (
              <div className="hover:bg-blue-500  hover:text-white px-2 rounded-xl" onClick={() => handleClick(rezult)} key={rezult}>
               <p className="sm:text-2xl shadow-md py-2 hover:shadow-none  mt-2"> {rezult}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  rezult: PropTypes.array,
  searchError: PropTypes.string,
  searchLoading: PropTypes.bool,
  searchrezults: PropTypes.array,
  liveFilter: PropTypes.func,
  setFilteredProjects: PropTypes.func,
  projects: PropTypes.array,
};

export default SearchBar;
