import React  from "react";
import { usePalette } from "react-palette";
import ProgressBar from "../ProgressBar/ProgressBar";
import ErrorImg from "../../Images/hand-1701969_1280.jpg";
import Notification from "../NotificationBanner/NotificationBanner";
import "./Popup.scss";

let FAVORITE_ARRAY = [];

function Popup({ selected, closePopup  }) {
  

  const { data } = usePalette(
    selected.Poster.length === 3 ? ErrorImg : selected.Poster
  );

  const createBuble = (input) => {
    return input.split(",");
  };

  const convMinToHour = (min = 0) => {
    let [mins, ...rest] = min.split(" ");
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? h : "0" + h;
    m = m < 10 ? "0" + m : m;
    return h == "0" ? `${m}min` : `${h}h:${m}min`;
  };

  //edit names
  const addToFav = () => {
    FAVORITE_ARRAY.push(selected);
    let serializedObj = JSON.stringify(FAVORITE_ARRAY);
    localStorage.setItem("favoriteMovies", serializedObj);
    document.querySelector(".notification").style.opacity = "1";
    setTimeout(() => {
      return (document.querySelector(".notification").style.opacity = "0");
    }, 1000);
  };
 


  return (
    <section className="popup container-fluid"    data-index={selected.imdbID}>
      <div className="content">
        <div
          className="BgImg"
          style={{
            boxShadow: `-3px 3px 22px 0px ${data.vibrant}`,
            background: `${data.vibrant}`,
          }}
        >
          <button onClick={addToFav} className="addFavBtn">
            <i className="far fa-heart"></i>
          </button>
         
          <img
            src={selected.Poster.length === 3 ? ErrorImg : selected.Poster}
            alt={selected.Title}
          />
          <button className="close" onClick={closePopup}>
            <i className="far fa-times-circle"></i>
          </button>
        </div>

        <h2>
          {selected.Title} <span>({selected.Year})</span>
        </h2>
        <ProgressBar rating={selected.imdbRating * 10} />

        <div className="genre">
          {createBuble(selected.Genre).map((item, index) => {
            return (
              <div className="genreItem" key={index}>
                {item}
              </div>
            );
          })}
        </div>

        <div className="ItemSpecs">
          <p>{convMinToHour(selected.Runtime)}</p> <p>|</p>
          <p>{selected.Type} </p>
        </div>

        <p className="plot">{selected.Plot}</p>
        <div className="actorsWrapper">
          <h3>Actors:</h3>
          <div className="actors">
            {createBuble(selected.Actors).map((item, index) => {
              return (
                <div className="actor" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}

export default Popup;
