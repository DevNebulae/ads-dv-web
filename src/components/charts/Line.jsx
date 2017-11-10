import React from "react"
import styled from "styled-components"

const Line = styled.path`
  fill: none;
  stroke: steelblue;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 1.5;
`

export default props => <Line d={props.lineFunction(props.data)} />
