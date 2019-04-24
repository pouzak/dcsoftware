import React, { Component, Fragment } from "react";
//import PropTypes from "prop-types";
//import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
//import { ReactComponent as Delsvg } from "./icons/delete.svg";
import { ReactComponent as Svg } from "./icons/expand.svg";
import { ReactComponent as DeleteIco } from "./icons/delete.svg";
import { MDBContainer } from "mdbreact";
import "./Settings.css";
import { dcdata } from "../Context";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import BillingChart from "./MyListBillingChart";
import ProfileChart from "./MyListProfileLoadChart";
import posed from "react-pose";
import {
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
//import Notifications from "./Notifications";

const Pose = posed.div({
  hoverable: true,
  pressable: false,

  init: {
    scale: 1,
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
    zIndex: 0
  },
  hover: {
    scale: 1.003,
    boxShadow: "0px 3px 12px rgba(0,0,0,0.3)",
    zIndex: 5
  }
  // press: {
  //   scale: 1.1,
  //   boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  //   zIndex: 5
  // }
});

export class MyList extends Component {
  state = {
    //active: ""
    modal: false
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
      })
      .catch(err => console.log(err));
  };

  deleteItem = () => {
    this.setState({
      [this.state.active]: undefined
    });
    this.props.context.deleteFromList(this.state.active);
    //console.log(newstate);
    //
    this.toggle();
    // const newstate = this.state;
    //this.setState({ ...this.state, [name]: undefined });
  };

  handleState = (name, state) => {
    this.setState({ [name]: { ...this.state[name], page: state, limit: 4 } });
  };
  setActive = name => {
    this.setState({
      active: name
    });
    this.toggle();
  };

  changeLimit = (name, count) => {
    this.setState({ [name]: { ...this.state[name], limit: count } });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    console.log(this.state);
    return (
      <div style={{ paddingBottom: "5rem", textAlign: "center" }}>
        {this.props.context.myList.length > 0 ? (
          <MDBContainer className="set-main">
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>
                {this.state.active}
              </MDBModalHeader>
              <MDBModalBody>Are You sure want to delete?</MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="primary" onClick={() => this.toggle(null)}>
                  Back
                </MDBBtn>
                <MDBBtn color="danger" onClick={() => this.deleteItem()}>
                  Delete
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <h1>My List</h1>

            {this.props.context.myList.map(item => (
              <div style={{ paddingBottom: "0.2rem" }}>
                <Pose>
                  <ExpansionPanel
                    className="exp-panel"
                    onChange={() => this.click(item)}
                  >
                    <ExpansionPanelSummary expandIcon={<Svg />}>
                      <div style={{ width: "100%", display: "flex" }}>
                        <Typography className="exp-item-name">ID: </Typography>
                        <Typography className="exp-item">
                          {item.name}
                        </Typography>
                        <Typography className="exp-item-name">
                          Added: {item.date}
                        </Typography>
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
                            <h2>
                              Meter Name: {item.name}{" "}
                              <DeleteIco
                                style={{ float: "right" }}
                                onClick={() => this.setActive(item.name)}
                                className="delete-ico"
                              />
                            </h2>

                            <hr />
                            <Grid
                              container
                              justify="center"
                              spacing={24}
                              direction="row"
                            >
                              <Grid item xs={4}>
                                <Grid
                                  container
                                  justify="center"
                                  spacing={24}
                                  alignItems="stretch"
                                >
                                  <Grid item xs={6}>
                                    <div style={{ float: "right" }}>
                                      MAC Address:
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <div style={{ float: "left" }}>
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
                                    </div>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <div style={{ float: "right" }}>LNID:</div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <div style={{ float: "left" }}>
                                      {item.lnid}
                                    </div>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <div style={{ float: "right" }}>
                                      Availability
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <div style={{ float: "left" }}>
                                      {item.availability}
                                    </div>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <div style={{ float: "right" }}>
                                      Firmware:
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <div style={{ float: "left" }}>
                                      {item.fw}
                                    </div>
                                  </Grid>
                                </Grid>

                                <hr />

                                <Grid
                                  container
                                  justify="center"
                                  spacing={24}
                                  direction="row"
                                  alignItems="stretch"
                                >
                                  {this.state[item.name].plc.length > 0 ? (
                                    <Grid item xs={6}>
                                      <div style={{ float: "right" }}>
                                        <MDBBtn
                                          color="dark-green"
                                          size="sm"
                                          onClick={() =>
                                            this.handleState(item.name, 1)
                                          }
                                        >
                                          PLC Log (
                                          {this.state[item.name].plc.length})
                                        </MDBBtn>
                                      </div>
                                    </Grid>
                                  ) : null}
                                  {this.state[item.name].comm.length > 0 ? (
                                    <Grid item xs={6}>
                                      <div style={{ float: "left" }}>
                                        <MDBBtn
                                          color="dark-green"
                                          size="sm"
                                          onClick={() =>
                                            this.handleState(item.name, 2)
                                          }
                                        >
                                          Comm Log (
                                          {this.state[item.name].comm.length})
                                        </MDBBtn>
                                      </div>
                                    </Grid>
                                  ) : null}
                                </Grid>
                                <Grid
                                  container
                                  justify="center"
                                  spacing={24}
                                  alignItems="stretch"
                                >
                                  <React.Fragment>
                                    <Grid item xs={6}>
                                      <div style={{ float: "right" }}>
                                        <MDBBtn
                                          color="indigo"
                                          size="sm"
                                          onClick={() =>
                                            this.handleState(item.name, 3)
                                          }
                                        >
                                          Billing
                                        </MDBBtn>
                                      </div>
                                    </Grid>

                                    <Grid item xs={6}>
                                      <div style={{ float: "left" }}>
                                        {item.profile ? (
                                          <MDBBtn
                                            color="indigo"
                                            size="sm"
                                            onClick={() =>
                                              this.handleState(item.name, 4)
                                            }
                                          >
                                            load profile
                                          </MDBBtn>
                                        ) : null}
                                      </div>
                                    </Grid>
                                  </React.Fragment>
                                </Grid>
                                <hr />
                              </Grid>

                              <Grid item xs={8}>
                                {this.state[item.name].page === 1 ? (
                                  <div>
                                    <h4>PLC log:</h4>
                                    <div
                                      style={{
                                        padding: "2rem",
                                        textAlign: "center"
                                      }}
                                    >
                                      <MDBListGroup>
                                        {this.state[item.name].plc
                                          .slice(0, this.state[item.name].limit)
                                          .map((item, index) => (
                                            <MDBListGroupItem
                                              key={index}
                                              style={{ fontSize: "0.8rem" }}
                                            >
                                              {item}
                                            </MDBListGroupItem>
                                          ))}
                                        {this.state[item.name].limit === 4 ? (
                                          <div
                                            style={{
                                              width: "100%"
                                            }}
                                          >
                                            <MDBBtn
                                              style={{
                                                width: "130px"
                                              }}
                                              color="dark-green"
                                              size="sm"
                                              onClick={() =>
                                                this.changeLimit(item.name, 25)
                                              }
                                            >
                                              Show all
                                            </MDBBtn>
                                          </div>
                                        ) : null}
                                      </MDBListGroup>
                                    </div>
                                  </div>
                                ) : null}
                                {this.state[item.name].page === 2 ? (
                                  <div>
                                    <h4>Communication log:</h4>
                                    <div
                                      style={{
                                        padding: "2rem",
                                        textAlign: "center"
                                      }}
                                    >
                                      <MDBListGroup>
                                        {this.state[item.name].comm.map(
                                          (item, index) => (
                                            <MDBListGroupItem key={index}>
                                              {item}
                                            </MDBListGroupItem>
                                          )
                                        )}
                                      </MDBListGroup>
                                    </div>
                                  </div>
                                ) : null}
                                {this.state[item.name].page === 3 ? (
                                  <BillingChart meter={item} />
                                ) : null}
                                {this.state[item.name].page === 4 ? (
                                  <ProfileChart meter={item} />
                                ) : null}
                                {!this.state[item.name].page ? (
                                  <BillingChart meter={item} />
                                ) : null}
                              </Grid>
                            </Grid>
                          </div>
                        ) : null}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Pose>
              </div>
            ))}
          </MDBContainer>
        ) : (
          <h2 style={{ paddingTop: "20rem" }}>List is empty :(</h2>
        )}
      </div>
    );
  }
}

export default dcdata(MyList);

// <Typography className="exp-item">
// {item.mac.slice(0, 2) +
//   ":" +
//   item.mac.slice(2, 4) +
//   ":" +
//   item.mac.slice(4, 6) +
//   ":" +
//   item.mac.slice(6, 8) +
//   ":" +
//   item.mac.slice(8, 10) +
//   ":" +
//   item.mac.slice(10, 12)}
// </Typography>

// {this.state[item.name] ? (
//   <div>
//     <h2>Meter Name: {item.name}</h2>
//     <hr />
//     {this.state[item.name].plc.length > 0 ? (
//       <div>
//         <h4>PLC logs:</h4>
//         <div
//           style={{ padding: "2rem", textAlign: "center" }}
//         >
//           {this.state[item.name].plc.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </div>
//       </div>
//     ) : null}

//     {this.state[item.name].comm.length > 0 ? (
//       <div>
//         <h4>Cummunication logs:</h4>
//         <div
//           style={{ padding: "2rem", textAlign: "center" }}
//         >
//           {this.state[item.name].comm.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </div>
//       </div>
//     ) : null}

//     {this.state[item.name].fw.length > 0 ? (
//       <div>
//         <h4>Fw logs:</h4>
//         <div
//           style={{ padding: "2rem", textAlign: "center" }}
//         >
//           {this.state[item.name].fw.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </div>
//       </div>
//     ) : null}
//   </div>
// ) : null}
// </Typography>
// </ExpansionPanelDetails>
// </ExpansionPanel>
// ))}
// </MDBContainer>
// ) : (
// <div className="center-default">
// <div className="spinner-border" role="status" />
// </div>
// )}

// {this.state[item.name].comm.length > 0 ? (
//   <div>
//     <Grid
//       item
//       xs={6}
//       style={{
//         border: "2px solid black"
//       }}
//     >
//       <div style={{ float: "left" }}>
//         <p>
//           PLC Log: Found
//           {
//             this.state[item.name].plc.length
//           }{" "}
//           items
//         </p>
//       </div>
//     </Grid>
//     <Grid
//       item
//       xs={8}
//       style={{
//         border: "2px solid black"
//       }}
//     >
//       <Button
//         size="small"
//         variant="contained"
//         color="secondary"
//       >
//         Secondary
//       </Button>
//     </Grid>
//   </div>
// ) : null}
