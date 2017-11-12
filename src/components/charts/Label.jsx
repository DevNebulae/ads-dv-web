import styled from "styled-components"

export default styled.text`
  font-size: ${props => props.styling.fontSize};
  fill: black;
  transform: ${props =>
    props.type === "x" ? "rotate(0deg)" : "rotate(-90deg)"};
  text-anchor: end;
`
