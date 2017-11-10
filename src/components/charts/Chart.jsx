import React from "react"

export default props => (
  <svg viewBox={`0 0 ${props.width} ${props.height}`}>
    {/*Usually referred to group in regular D3 examples*/}
    <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
      {props.children}
    </g>
  </svg>
)
