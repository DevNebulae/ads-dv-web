import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import ApolloApp from "./components/ApolloApp"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<ApolloApp />, document.getElementById("root"))
registerServiceWorker()
