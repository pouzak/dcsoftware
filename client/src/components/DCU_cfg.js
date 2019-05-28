import React, { Component } from "react";
import { Consumer } from "../Context";
import "./Settings.css";
import Checkbox from "@material-ui/core/Checkbox";
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
import { dcdata } from "../Context";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";

class Ethernet extends Component {
  state = {
    dataa: null,
    file: null,
    name: null
  };

  handleUpload(ev) {
    ev.preventDefault();
    this.setState({
      file: ev.target.files[0],
      name: ev.target.files[0].name
    });
  }
  upload = e => {
    e.preventDefault();
    if (this.state.file) {
      const data = new FormData();
      data.append("file", this.state.file);
      data.append("filename", this.state.name);

      fetch("/api/upload", {
        method: "POST",
        body: data
      }).then(response => {
        toast.success(`${this.state.name} uploaded!`);
        this.setState({
          file: null,
          name: null
        });
      });
    }
  };

  handleChange = (path, e) => {
    this.props.context.handleInput(path, "#text", e);
    this.props.context.valueChange();
  };

  tost = () => {
    toast.success("Clock updated!");
  };
  date = () => {
    if (this.props.context.valueChange()) this.tost();
  };

  render() {
    return (
      <div>
        <Consumer>
          {value => {
            const { data, checkbox } = value;
            return (
              <div>
                {data ? (
                  <MDBContainer className="set-main">
                    <h1>DCU Configuration</h1>
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
                        <h3 className="float-right">XML Backup:</h3>
                      </MDBCol>
                      <form>
                        <MDBCol size="12">
                          <div>
                            <input
                              onChange={e => this.handleUpload(e)}
                              name="uploadInput"
                              type="file"
                              accept=".xml,.txt"
                              style={{ width: "150px" }}
                            />
                            {this.state.name ? (
                              <button onClick={e => this.upload(e)}>
                                Upload {this.state.name}
                              </button>
                            ) : (
                              <a
                                href="https://github.com/pouzak/dcsoftware/blob/master/server/data/config.xml"
                                download=""
                              >
                                Download
                              </a>
                            )}
                          </div>
                        </MDBCol>
                      </form>
                    </MDBRow>

                    <MDBRow className="cont">
                      <MDBCol size="4">
                        <h3 className="float-right">Date / Time Sync:</h3>
                      </MDBCol>

                      <MDBCol size="2">
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
                          color="primary"
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
                      <MDBRow className="cont">
                        <MDBCol size="4" />
                        <MDBCol size="2">
                          <div>
                            <MDBBtn
                              color="primary"
                              size="md"
                              onClick={() => this.date()}
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
