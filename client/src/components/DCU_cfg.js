import React, { Component } from "react";
import { Consumer } from "../Context";
import "./Settings.css";
import Checkbox from "@material-ui/core/Checkbox";
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
import { dcdata } from "../Context";
import TextField from "@material-ui/core/TextField";

class Ethernet extends Component {
  state = {
    dataa: null
  };

  handleChange = (path, e) => {
    //this.props.context.handleInput('dc_data.config.settings.dcu_configuration.communication_protocol', '#text' , e)
    this.props.context.handleInput(path, "#text", e);
    /* let {name, value} = e.target;
    this.setState({
      [name]: value,
    
    }); */
    this.props.context.valueChange();
  };

  date = e => {
    console.log(e.target.value);
  };

  render() {
    return (
      <div>
        <Consumer>
          {value => {
            const { data, checkbox } = value;
            //const checkboxPath = data.config.settings.ethernet.ethernet_type.dhcp;
            //console.log(data)

            return (
              <div>
                {data ? (
                  <MDBContainer className="set-main">
                    <h1>DCU Configuration</h1>
                    {/* <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> */}
                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Device ID:</h3>
                      </MDBCol>

                      <MDBCol size="2">
                        <input
                          type="text"
                          id="example1"
                          className="form-control"
                          value={data.config.settings.dcu_configuration.id}
                          disabled
                        />
                      </MDBCol>

                      {/* <MDBCol size="2">
                    <div><MDBBtn color="primary" size="md" onClick={() => valueChange()}>Change</MDBBtn></div>
                    </MDBCol> */}
                    </MDBRow>

                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Model:</h3>
                      </MDBCol>

                      <MDBCol size="2">
                        <input
                          type="text"
                          id="example1"
                          className="form-control"
                          value={data.config.settings.dcu_configuration.model}
                          disabled
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Manufacturing Year:</h3>
                      </MDBCol>

                      <MDBCol size="2">
                        <input
                          type="text"
                          id="example1"
                          className="form-control"
                          value={data.config.settings.dcu_configuration.year}
                          disabled
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Communication protocol:</h3>
                      </MDBCol>

                      <MDBCol size="2">
                        {/*  <input type="text" id="example1" className="form-control" value={data.config.settings.dcu_configuration.communication_protocol['#text']} disabled/> */}
                        <select
                          className="browser-default custom-select "
                          defaultValue={
                            data.config.settings.dcu_configuration
                              .communication_protocol["#text"]
                          }
                          onChange={e => {
                            this.handleChange(
                              "dc_data.config.settings.dcu_configuration.communication_protocol",
                              e
                            );
                          }}
                        >
                          <option
                            value={
                              data.config.settings.dcu_configuration
                                .communication_protocol["@value1"]
                            }
                          >
                            {
                              data.config.settings.dcu_configuration
                                .communication_protocol["@value1"]
                            }
                          </option>
                          <option
                            value={
                              data.config.settings.dcu_configuration
                                .communication_protocol["@value2"]
                            }
                          >
                            {
                              data.config.settings.dcu_configuration
                                .communication_protocol["@value2"]
                            }
                          </option>
                        </select>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Date / Time Sync:</h3>
                      </MDBCol>

                      <MDBCol size="2">
                        {/*  <input type="text" id="example1" className="form-control" value={data.config.settings.dcu_configuration.communication_protocol['#text']} disabled/> */}

                        <Checkbox
                          checked={JSON.parse(
                            data.config.settings.date_time.sync["@bool"]
                          )}
                          onChange={() =>
                            checkbox(
                              this.props.context.data.config.settings.date_time
                                .sync
                            )
                          }
                          value="checked"
                          color="secondary"
                        />
                      </MDBCol>
                    </MDBRow>

                    <div
                      style={
                        JSON.parse(data.config.settings.date_time.sync["@bool"])
                          ? { pointerEvents: "none", opacity: 0.4 }
                          : { opacity: 1 }
                      }
                    >
                      <MDBRow className="cont">
                        <MDBCol size="4">
                          <h3 className="float-right">Set:</h3>
                        </MDBCol>

                        <MDBCol size="2">
                          <div style={{ width: "50px" }}>
                            <form noValidate>
                              {/*  <TextField
                        id="time"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 60, // 5 min
                        }}
                      /> */}
                              <TextField
                                id="datetime-local"
                                type="datetime-local"
                                defaultValue={
                                  data.config.settings.date_time.datetime
                                }
                                InputLabelProps={{
                                  shrink: true
                                }}
                                onChange={e =>
                                  this.props.context.handleInput(
                                    "dc_data.config.settings.date_time",
                                    "datetime",
                                    e
                                  )
                                }
                                className="datetime"
                              />
                            </form>
                          </div>
                        </MDBCol>
                      </MDBRow>

                      {/* apply changes button */}
                      <MDBRow className="cont">
                        <MDBCol size="4" />
                        <MDBCol size="2">
                          <div>
                            <MDBBtn
                              color="primary"
                              size="md"
                              onClick={() => this.props.context.valueChange()}
                            >
                              change time
                            </MDBBtn>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBContainer>
                ) : (
                  <div className="center-default">
                    <div class="spinner-border" role="status" />
                  </div>
                )}
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default dcdata(Ethernet);

/* <MDBContainer className="set-main">
                  <h1>DCU Configuration</h1>
                  {/* <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> 
                  <MDBRow className="cont">
                  <MDBCol size="3">
                     <h3>ID:</h3>
                  </MDBCol>

                  <MDBCol size="2">
                  <Checkbox
                  checked={JSON.parse(data.config.settings.ethernet.ethernet_type.dhcp['@bool'])}
                  onChange={() => checkbox(this.props.context.data.config.settings.ethernet.ethernet_type.dhcp)}
                    value="checked"
                    color="secondary"
                    
                    />
                  </MDBCol>

                  <MDBCol size="2">
                  <div><MDBBtn color="primary" size="md" onClick={() => valueChange()}>Change</MDBBtn></div>
                  </MDBCol>
                   
                 </MDBRow>
              </MDBContainer>
 */
