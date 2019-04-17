import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as Delsvg } from "./icons/delete.svg";
import { ReactComponent as Svg } from "./icons/expand.svg";
import { MDBContainer } from "mdbreact";
import "./Settings.css";
import { dcdata } from "../Context";
import axios from "axios";

export class MyList extends Component {
  state = {
    active: ""
  };

  click = item => {
    axios
      .post("api/listitem", item)
      .then(res => {
        const name = item.name;
        this.setState({
          active: item.name,
          [name]: res.data
        });
        //console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ paddingBottom: "5rem", textAlign: "center" }}>
        {this.props.context.myList ? (
          <MDBContainer className="set-main">
            <h1>My List</h1>

            {this.props.context.myList.map(item => (
              <ExpansionPanel
                className="exp-panel"
                onClick={() => this.click(item)}
              >
                <ExpansionPanelSummary expandIcon={<Svg />}>
                  <div style={{ display: "flex" }}>
                    <Typography className="exp-item">{item.name}</Typography>
                    <Typography className="exp-item">
                      {item.mac.slice(0, 2) +
                        ":" +
                        item.mac.slice(2, 4) +
                        ":" +
                        item.mac.slice(4, 6) +
                        ":" +
                        item.mac.slice(6, 8) +
                        ":" +
                        item.mac.slice(8, 10) +
                        ":" +
                        item.mac.slice(10, 12)}
                    </Typography>
                    <Typography className="exp-item">{item.lnid}</Typography>
                    <Typography className="exp-item">
                      {item.availability}
                    </Typography>
                    <Typography className="exp-item">{item.fw}</Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {/* <Typography>{this.state[item.name]}</Typography> */}
                  <Typography
                    style={{
                      width: "100%",
                      padding: "50px",
                      fontSize: "0.8rem"
                    }}
                  >
                    {this.state[item.name] ? (
                      <div>
                        {this.state[item.name].plc.length > 0 ? (
                          <div>
                            <h4>PLC logs:</h4>
                            <div
                              style={{ padding: "2rem", textAlign: "center" }}
                            >
                              {this.state[item.name].plc.map((item, index) => (
                                <p key={index}>{item}</p>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {this.state[item.name].comm.length > 0 ? (
                          <div>
                            <h4>Cummunication logs:</h4>
                            <div
                              style={{ padding: "2rem", textAlign: "center" }}
                            >
                              {this.state[item.name].comm.map((item, index) => (
                                <p key={index}>{item}</p>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {this.state[item.name].fw.length > 0 ? (
                          <div>
                            <h4>Fw logs:</h4>
                            <div
                              style={{ padding: "2rem", textAlign: "center" }}
                            >
                              {this.state[item.name].fw.map((item, index) => (
                                <p key={index}>{item}</p>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </MDBContainer>
        ) : (
          <div className="center-default">
            <div className="spinner-border" role="status" />
          </div>
        )}
      </div>
    );
  }
}

export default dcdata(MyList);

/* 
<ExpansionPanel className="exp-panel">
<ExpansionPanelSummary expandIcon={<Svg />}>
  <Typography>Expansion Panel 1</Typography>
  <Typography>yah</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
  <Typography>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
    eget.
  </Typography>
</ExpansionPanelDetails>
</ExpansionPanel> */

/* import React, { Component } from "react";
import { dcdata } from "../Context";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import "./Settings.css";
import Paper from "@material-ui/core/Paper";
import posed from "react-pose";
import axios from "axios";

const Hover = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    margin: "1px",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  },
  press: {
    scale: 1,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  }
});

export class MyList extends Component {
  state = {
    active: "",
    data: ""
  };
  // click = item => {
  //   this.setState({
  //     active: item.name,
  //     data: item.mac
  //   });
  // };

  click = item => {
    axios
      .post("api/listitem", item)
      .then(res => {
        this.setState({
          active: item.name
          //data: res.data
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.props.context.myList ? (
          //this.props.context.myList.map(item => <p>{item.name}</p>
          <MDBContainer className="set-main">
            <h1>My List</h1>

            {this.props.context.myList.map(item => (
              <Hover>
                <Paper>
                  <div
                    style={{ padding: "10px", display: "flex" }}
                    onClick={() => this.click(item)}
                  >
                    <p style={{ paddingRight: "20%" }}>{item.name}</p>
                    <p style={{ paddingRight: "20%" }}>{item.mac}</p>
                    <p style={{ paddingRight: "20%" }}>{item.fw}</p>
                    {item.name === this.state.active ? (
                      <h3 style={{ padding: "100px" }}>{this.state.data}</h3>
                    ) : null}
                  </div>
                </Paper>
              </Hover>
            ))}
          </MDBContainer>
        ) : null}
      </div>
    );
  }
}

export default dcdata(MyList); */
