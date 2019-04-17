import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
//import axios from "axios";
import "./Settings.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LogPLC from "./Log_PLC";
import CommunicationLog from "./Log_Communication";
import FWLog from "./Log_FWUpdate";

export class PLCStats extends Component {
  state = {
    value: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <MDBContainer className="set-main allign-center">
          <h1>PLC Statistics</h1>
          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={{ outline: "none" }}
          >
            <Tab label="PLC Metering Log" style={{ outline: "none" }} />
            <Tab label="Communication Log" style={{ outline: "none" }} />
            <Tab label="FW Update Log" style={{ outline: "none" }} />
          </Tabs>
          {this.state.value === 0 ? <LogPLC /> : null}
          {this.state.value === 1 ? <CommunicationLog /> : null}
          {this.state.value === 2 ? <FWLog /> : null}
        </MDBContainer>
      </div>
    );
  }
}

export default PLCStats;
