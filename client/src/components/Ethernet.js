import React, { Component } from "react";
import { Consumer } from "../Context";
import "./Settings.css";
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
import { dcdata } from "../Context";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";

class Ethernet extends Component {
  dataChange = () => {
    let st = this.props.context.data.config.settings.ethernet.ethernet_type
      .dhcp;
    st["@bool"] === "true" ? (st["@bool"] = "false") : (st["@bool"] = "true");
    this.setState({
      data: st
    });
    this.props.context.valueChange();
  };

  handleChange = (path, e) => {
    this.props.context.handleInput(path, "#text", e);
    this.props.context.valueChange();
  };

  submit = e => {
    e.preventDefault();
    this.props.context.valueChange();
    toast.success("Successfully saved!");
  };

  render() {
    return (
      <div>
        <Consumer>
          {value => {
            let { data } = value;

            // style={{border: "2px solid red"}}

            return (
              <div>
                {data ? (
                  <MDBContainer className="set-main allign-center">
                    <form onSubmit={e => this.submit(e)}>
                      <h1>Ethernet Configuration</h1>
                      {/* <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> */}
                      {/* <ToastContainer
                      bodyClassName="toast-container"
                      position="top-right"
                      autoClose={1700}
                      hideProgressBar
                      newestOnTop={true}
                      closeOnClick
                      rtl={false}
                      pauseOnVisibilityChange
                      draggable
                      pauseOnHover
                      transition={Flip}
                    /> */}
                      <MDBRow className="cont">
                        <MDBCol size="4">
                          <h3 className="float-right">Ethernet Type:</h3>
                        </MDBCol>

                        <MDBCol size="2">
                          {/*  <input type="text" id="example1" className="form-control" value={data.config.settings.dcu_configuration.communication_protocol['#text']} disabled/> */}
                          <select
                            className="browser-default custom-select "
                            defaultValue={
                              data.config.settings.ethernet.ethernet_type[
                                "#text"
                              ]
                            }
                            onChange={e => {
                              this.handleChange(
                                "dc_data.config.settings.ethernet.ethernet_type",
                                e
                              );
                            }}
                          >
                            <option
                              value={
                                data.config.settings.ethernet.ethernet_type[
                                  "@value1"
                                ]
                              }
                            >
                              {
                                data.config.settings.ethernet.ethernet_type[
                                  "@value1"
                                ]
                              }
                            </option>
                            <option
                              value={
                                data.config.settings.ethernet.ethernet_type[
                                  "@value2"
                                ]
                              }
                            >
                              {
                                data.config.settings.ethernet.ethernet_type[
                                  "@value2"
                                ]
                              }
                            </option>
                            <option
                              value={
                                data.config.settings.ethernet.ethernet_type[
                                  "@value3"
                                ]
                              }
                            >
                              {
                                data.config.settings.ethernet.ethernet_type[
                                  "@value3"
                                ]
                              }
                            </option>
                          </select>
                        </MDBCol>
                      </MDBRow>

                      <div
                        style={
                          data.config.settings.ethernet.ethernet_type[
                            "#text"
                          ] !== "disabled"
                            ? { opacity: 1 }
                            : { pointerEvents: "none", opacity: 0.4 }
                        }
                      >
                        <MDBRow className="cont">
                          <MDBCol size="4">
                            <h3 className="float-right">IP Address: </h3>
                          </MDBCol>

                          <MDBCol size="2">
                            {/* <input type="text" id="example1" className="form-control" onChange={this.handleInputChange} value={data.config.settings.ethernet.dns_server}/> */}

                            <input
                              type="text"
                              autofocus
                              required
                              id="example1"
                              className="form-control"
                              pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                              title="Enter valid IP address, e.g 192.168.0.1"
                              onChange={e =>
                                this.props.context.handleInput(
                                  "dc_data.config.settings.ethernet",
                                  "ip_address",
                                  e
                                )
                              }
                              value={data.config.settings.ethernet.ip_address}
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="cont">
                          <MDBCol size="4">
                            <h3 className="float-right">Subnet Mask: </h3>
                          </MDBCol>

                          <MDBCol size="2">
                            {/* <input type="text" id="example1" className="form-control" onChange={this.handleInputChange} value={data.config.settings.ethernet.dns_server}/> */}

                            <input
                              type="text"
                              id="example1"
                              required
                              title="Enter valid Subnet Mask address, e.g 255.255.255.0"
                              pattern="^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254)))))$"
                              className="form-control"
                              onChange={e =>
                                this.props.context.handleInput(
                                  "dc_data.config.settings.ethernet",
                                  "subnet_mask",
                                  e
                                )
                              }
                              value={data.config.settings.ethernet.subnet_mask}
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="cont">
                          <MDBCol size="4">
                            <h3 className="float-right">Default Gateway: </h3>
                          </MDBCol>

                          <MDBCol size="2">
                            {/* <input type="text" id="example1" className="form-control" onChange={this.handleInputChange} value={data.config.settings.ethernet.dns_server}/> */}

                            <input
                              title="Enter valid Default Gateway address, e.g 192.168.1.1"
                              type="text"
                              id="example1"
                              required
                              className="form-control"
                              pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                              onChange={e =>
                                this.props.context.handleInput(
                                  "dc_data.config.settings.ethernet",
                                  "default_gateway",
                                  e
                                )
                              }
                              value={
                                data.config.settings.ethernet.default_gateway
                              }
                            />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow className="cont">
                          <MDBCol size="4">
                            <h3 className="float-right">DNS:</h3>
                          </MDBCol>

                          <MDBCol size="2">
                            {/*  <input type="text" id="example1" className="form-control" value={data.config.settings.dcu_configuration.communication_protocol['#text']} disabled/> */}
                            <select
                              className="browser-default custom-select "
                              defaultValue={
                                data.config.settings.ethernet.dns["#text"]
                              }
                              onChange={e => {
                                this.handleChange(
                                  "dc_data.config.settings.ethernet.dns",
                                  e
                                );
                              }}
                            >
                              <option
                                value={
                                  data.config.settings.ethernet.dns["@value1"]
                                }
                              >
                                {data.config.settings.ethernet.dns["@value1"]}
                              </option>
                              <option
                                value={
                                  data.config.settings.ethernet.dns["@value2"]
                                }
                              >
                                {data.config.settings.ethernet.dns["@value2"]}
                              </option>
                            </select>
                          </MDBCol>
                        </MDBRow>

                        <div
                          style={
                            data.config.settings.ethernet.dns["#text"] !==
                            "AUTO"
                              ? { opacity: 1 }
                              : { pointerEvents: "none", opacity: 0.4 }
                          }
                        >
                          <MDBRow className="cont">
                            <MDBCol size="4">
                              <h3 className="float-right">Primary DNS: </h3>
                            </MDBCol>

                            <MDBCol size="2">
                              {/* <input type="text" id="example1" className="form-control" onChange={this.handleInputChange} value={data.config.settings.ethernet.dns_server}/> */}

                              <input
                                type="text"
                                id="example1"
                                required
                                className="form-control"
                                title="Enter valid DNS address, e.g 1.0.0.1"
                                pattern="^\d+(\.\d{1,3}){3}$"
                                onChange={e =>
                                  this.props.context.handleInput(
                                    "dc_data.config.settings.ethernet",
                                    "dns_server",
                                    e
                                  )
                                }
                                value={data.config.settings.ethernet.dns_server}
                              />
                            </MDBCol>
                          </MDBRow>

                          <MDBRow className="cont">
                            <MDBCol size="4">
                              <h3 className="float-right">Secondary DNS: </h3>
                            </MDBCol>

                            <MDBCol size="2">
                              {/* <input type="text" id="example1" className="form-control" onChange={this.handleInputChange} value={data.config.settings.ethernet.dns_server}/> */}

                              <input
                                type="text"
                                title="Enter valid DNS address, e.g 1.1.1.1"
                                pattern="^\d+(\.\d{1,3}){3}$"
                                id="example1"
                                required
                                className="form-control"
                                onChange={e =>
                                  this.props.context.handleInput(
                                    "dc_data.config.settings.ethernet",
                                    "dns_server2",
                                    e
                                  )
                                }
                                value={
                                  data.config.settings.ethernet.dns_server2
                                }
                              />
                            </MDBCol>
                          </MDBRow>
                        </div>

                        {/* apply change button */}
                        <MDBRow className="cont">
                          <MDBCol size="4" />
                          <MDBCol size="2">
                            <div>
                              <MDBBtn color="primary" size="md" type="submit">
                                Apply changes
                              </MDBBtn>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </div>
                    </form>
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

/* <Checkbox
                  checked={JSON.parse(data.config.settings.ethernet.ethernet_type.dhcp['@bool'])}
                  onChange={() => checkbox(this.props.context.data.config.settings.ethernet.ethernet_type.dhcp)}
                    value="checked"
                    color="secondary"
                    
                    /> */

/* <MDBContainer className="set-main">
<h1>DCU Configuration</h1>
{ <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> }
<MDBRow>
 <MDBCol size="8" className="cont">
    <h3>Primary DNS: </h3>
    
    <input type="text" id="example1" className="form-control" />
    <div><MDBBtn color="primary" onClick={() => this.props.context.valueChange()}>Change</MDBBtn></div>
  </MDBCol>
</MDBRow>
</MDBContainer>
 */

//() => this.props.context.valueChange(this.state.data)

//this.props.context.data ? (this.setState({data: this.props.context.data})):(console.log("no"))

/*
this.setState({
      data: this.props.context.data
    })
<MDBBtn color="primary" onClick={() => this.props.context.valueChange()}>run</MDBBtn>






 dataChange = () => {
    const st = this.props.context.data;
        st.config.settings.ethernet.ethernet_type.dhcp['@bool'] === "true" ? st.config.settings.ethernet.ethernet_type.dhcp['@bool'] ="false" : st.config.settings.ethernet.ethernet_type.dhcp['@bool'] = "true"
        this.setState({
          data:st
        })
        console.log(this.state.data)
  }

*/
