import React, { useState } from "react";
import Search from "./Components/Search/Search";
import Results from "./Components/Results/Results";
import Popup from "./Components/Popup/Popup";
import Spinner from "./Components/Spinner/Spinner";
import FavroiteSection from "./Components/Favorites/Favorites";
import Error from "./Components/Error page/Error";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    loading: false,
    filterValue: "default",
  });

  const url = "http://www.omdbapi.com/?apikey=dfe6d885";


  const search = (e) => {
    if (e.key === "Enter") {
      setState((prevState) => {
        return { ...prevState, loading: true };
      });
      axios(url + "&s=" + state.s)
        .then(({ data }) => {
          console.log(state.filterValue);
          let results = data.Search;
          results = results.length === 0 ? <Error /> : results;

          setState((prevState) => {
            return { ...prevState, results: results.sort(compare), loading: false };
          });
        })
        .catch((error) => {
          console.error(`the error is ${error}`);
          setState((prevState) => {
            return { ...prevState, loading: false };
          });
        });
    }
  };


  // sort function by newest
  const compare = (a, b) => {
    const number1 = a.Year;
    const number2 = b.Year;

    let comparison = 0;
    if (number1 < number2) {
      comparison = 1;
    } else if (number1 > number2) {
      comparison = -1;
    }
    return comparison;
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(url + "&i=" + id).then(({ data }) => {
      let result = data;
      document.body.style.overflow = "hidden";

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    document.body.style.overflow = "auto";

    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  let resultsCards = (
    <Results results={state.results} openPopup={openPopup} s={state.s} />
  );

  if (state.loading) {
    resultsCards = <Spinner />;
  }

  return (
    <section className="container-fluid">
      <header>
        <h1>
          Movie Time <i className="fas fa-film"></i>
        </h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
       
        {resultsCards}
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
        <FavroiteSection openPopup={openPopup} />
      </main>
    </section>
  );
}

export default App;
