import React, {useState} from "react"
import Header from "./component/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Body from "./component/Body";
import {store} from "./redux/store"
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
     <Provider store={store}>
     <Header />
     <Body filterState />
     </Provider>
    </div>
  );
}

export default App;
