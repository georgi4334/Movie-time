import React, { useState, useEffect } from "react";
import "./ProgressBar.scss";

const Progress = ({ rating }) => {
  const [style, setStyle] = useState({});
  useEffect(() => {
    let delayTimer = setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${rating}%`,
      };
      setStyle(newStyle);
    }, 250);
    return () => clearTimeout(delayTimer);
  });

  return (
    <section className="progressBar">
      <div className="progress">
        <div className="progress-done" style={style}>
          Rating {rating / 10} / 10
        </div>
      </div>
    </section>
  );
};
export default Progress;
