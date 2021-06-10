import './App.css';
import { TableView } from "./TableView";
import { VerticalBar } from "./Graph";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Navbar} from "./Navbar";

function App() {

  return (
    
    <BrowserRouter>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <TableView />
          </Route>
          <Route path="/about">
            <VerticalBar />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
