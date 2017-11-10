import * as d3 from "d3"
import React from "react"

export default props => (
  <g
    className={`axis ${props.type}`}
    ref={node => d3.select(node).call(props.axis)}
    style={props.style}
  />
)
