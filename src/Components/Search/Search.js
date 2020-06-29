import React from "react";
import './Search.scss'

export default function Search({ handleInput, search }) {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="search for a movie"
        className="seachbox"
        onChange={handleInput}
        onKeyPress={search}
      />
    </section>
  );
}
