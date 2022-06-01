import React from "react";
import {Switch,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Start from "./pages/Start";

function App() {
  return (

    <Switch>
      <Route exact path="/">
        <Home/> 
      </Route>
      <Route exact path="/started">
        <Start/>
      </Route>
      <Route>
        404 NOT FOUND
      </Route>
    </Switch>
  );
}

export default App;
