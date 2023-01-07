import React, {useState} from "react"
import Header from "./component/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Body from "./component/Body";


function App() {
 const [filterState, setFilterState] = useState("")
  const filterText = (text) => {
    console.log("this is coming from app",text);
    if(text) setFilterState(text)
    }
  return (
    <div className="App">
     <Header filterText={filterText} />
     <Body filterState = {filterState} />
    </div>
  );
}

export default App;
