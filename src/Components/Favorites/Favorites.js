import React from "react";
import Result from "../Results/Results";
import "./Favorites.scss";

export default function Favorites({ openPopup }) {
  let results = JSON.parse(localStorage.getItem("favoriteMovies"));
 

  let renderResults =
    results === null ? (
      ""
    ) : (
      <div className="resultsFav">
          <hr />
        <h2>Favorites</h2>
        <Result results={results} openPopup={openPopup} />
      </div>
    );
  return <section>{renderResults}</section>;
}
