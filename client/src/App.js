import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Ethernet from "./components/Ethernet";
import MeterStats from "./components/MeterStats";
import NavMobile from "./components/NavMobile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MDBCol, MDBRow } from "mdbreact";
import { Provider } from "./Context";
import Page404 from "./components/Page404";
import DCU_cfg from "./components/DCU_cfg";
import dcuStats from "./components/dcuStats";
import PLCStats from "./components/PLCStats";
import MyList from "./components/MyList";
import BlackList from "./components/BlackList";
import Toster from "./components/Toster";

class App extends Component {
  state = {
    navOpen: false,
    dc_data: null,
    width: 0,
    height: 0
  };
  hoverHandler = () => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  };
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", () => this.updateWindowDimensions());
  }

  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <Toster />
            <div className="gradient">
              <MDBRow className="dash">
                {this.state.width > 1000 ? (
                  <MDBCol className="nav-container" size="2">
                    <div className="nav-bar">
                      <Navbar />
                    </div>
                  </MDBCol>
                ) : (
                  <NavMobile />
                )}

                <MDBCol className="main">
                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/ethernet" component={Ethernet} />
                    <Route exact path="/meterstats" component={MeterStats} />
                    <Route exact path="/topology" component={Page404} />
                    <Route exact path="/dcuconfig" component={DCU_cfg} />
                    <Route exact path="/dcustats" component={dcuStats} />
                    <Route exact path="/plcstats" component={PLCStats} />
                    <Route exact path="/mylist" component={MyList} />
                    <Route exact path="/blacklist" component={BlackList} />
                    <Route component={Page404} />
                  </Switch>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
