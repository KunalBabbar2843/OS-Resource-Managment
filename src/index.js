import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import CpuSchedulingVisualizer from "./CpuSchedulingVisulaizer";
import MemoryManagmentVisualizer from "./MemoryManagmentVisualizer";
import DiskSchedulingVisualizer from "./DiskSchedulingVisualizer";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App(props) {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/resource/cpu-scheduling">
            <CpuSchedulingVisualizer />
          </Route>
          <Route path="/resource/memory-managment">
            <MemoryManagmentVisualizer />
          </Route>
          <Route path="/resource/disk-scheduling">
            <DiskSchedulingVisualizer/>
          </Route>
          <Redirect to="/home"/>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

ReactDOM.render(<App />, window.root);
