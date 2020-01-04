import React, { forwardRef } from "react";
import "./Occurrence.scss";
import { getHash } from "../../../../../util/items/items";
import { rowGap, colGap } from "../../../../../util/grid/grid";

import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const Ocurrence = forwardRef((props, ref) => {
  const colorsLength = 6;

  return (
    <div
      ref={ref}
      className={`occurrence occurrence--color${Math.abs(getHash(props.element.code?props.element.code:props.element.type)) % colorsLength}
       ${props.element.isTemp ? "isTemp" : ""}
       ${props.element.overlap ? "overlap" : ""}`}
      style={{
        gridRowStart: props.element.indexStart + rowGap,
        gridRowEnd: props.element.indexEnd + rowGap,
        gridColumnStart: props.day + colGap
      }}
    >
      <button className="occurrence__close" onClick={props.eliminateOccurrence}>&times;</button>
      <p className="occurrence__title">{props.title?props.title:props.element.title}</p>
      <p className="occurrence__code">{props.element.code}</p>
      <p className="occurrence__place">{props.element.place}</p>
    </div>
  );
});

Ocurrence.propTypes = {
  title:PropTypes.string,
  day:PropTypes.number,
  element: PropTypes.any,
  eliminateOccurrence: PropTypes.any
};

export default Ocurrence;
