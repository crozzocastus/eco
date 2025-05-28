import React from "react";

const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search activities..."
    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-[#212121] bg-[#F0F0F0]"
    style={{ borderColor: "#BDBDBD" }}
    onChange={e => onSearch && onSearch(e.target.value)}
  />
);

export default SearchBar;
