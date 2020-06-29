import React from "react";
import { usePalette } from "react-palette";
import { useSpring, animated } from "react-spring";
import ErrorImg from "../../Images/hand-1701969_1280.jpg";

import "./Results.scss";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 80,
  (x - window.innerWidth / 2) / 50,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Result({ result, openPopup }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 3, tension: 145, friction: 40 },
  }));

  const { data } = usePalette(
    result.Poster.length === 3 ? ErrorImg : result.Poster
  );

  
  return (
    <animated.div
      className= 'result'
      
      onClick={() => openPopup(result.imdbID)}
      

      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans), boxShadow: `0px 0px 37px -12px ${data.vibrant}` }}
    >
      <img
        src={result.Poster.length === 3 ? ErrorImg : result.Poster}
        alt={result.Title}
      />
      <h3> {result.Title} </h3>
    </animated.div>
  );
}

export default Result;
