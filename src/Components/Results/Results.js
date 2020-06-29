import React, { useState, useEffect } from "react";
import Result from "./Result";

import "./Results.scss";

function Results({ results, openPopup, s }) {
  
  const [count, setCount] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(<p className="formNotification">Please press Enter</p>) 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="results">
     
      {results.length === 0 && s.length > 0
        ? count
        : results.map((result,index) => (
            <Result key={result.imdbID + index} result={result} openPopup={openPopup} />
          ))}
       
    </section>
  );
}

export default Results;
