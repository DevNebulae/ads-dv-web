import * as d3 from "d3"
import React from "react"
import styled from "styled-components"

const Axis = styled.g`font-size: ${props => props.fontSize};`

export default props => {
  const { type, axis, styling, ..._props } = props
  return (
    <Axis
      className={`axis ${type}`}
      fontSize={styling.fontSize}
      innerRef={node => d3.select(node).call(axis)}
      {..._props}
    >
      {props.children}
    </Axis>
  )
}
