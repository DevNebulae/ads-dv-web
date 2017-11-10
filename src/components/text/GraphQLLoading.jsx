import styled from "styled-components"
import React from "react"

const Well = styled.div`
  background-color: #eeeeee;
  width: 95%;
  margin: 16px auto;
  border-radius: 5px;
  text-align: center;
  padding: 32px 16px;
  box-sizing: border-box;
`

export default () => (
  <Well>
    <h2>Loading...</h2>
    <p>
      Please be patient, it can be up to 10 MB of data that you're downloading!
    </p>
  </Well>
)
