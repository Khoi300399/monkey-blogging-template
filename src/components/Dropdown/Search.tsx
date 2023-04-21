import React from "react";
import { IconSearch } from "../Icon";

type Props = {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Search = ({ placeholder, onChange, className = "", ...props }: Props) => {
  return (
    <div className={`search ${className}`}>
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      <span className="search-icon">
        <IconSearch />
      </span>
    </div>
  );
};

export default Search;
