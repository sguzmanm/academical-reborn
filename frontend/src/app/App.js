import React from "react";
import { Provider } from "react-redux";
import store from "../store/mainStore";
import Router from "./Router";
import "./App.css";
//Comentario Code-review
function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
      </Router>
    </Provider>
  );
}

export default AppRouter;
