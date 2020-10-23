import React from "react";
import "./App.css";
import Form from "./Components/Form/Form";
import Chat from "./Components/Chat/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
    <Router>
      <Route path="/" exact component={Form} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  </CookiesProvider>
  );
}

export default App;
