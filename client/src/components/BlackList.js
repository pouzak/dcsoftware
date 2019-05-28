import React, { Component } from "react";

import "./Settings.css";

import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
import { dcdata } from "../Context";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { toast } from "react-toastify";
import { ReactComponent as DeleteIco } from "./icons/delete.svg";
import Tooltip from "@material-ui/core/Tooltip";

class BlackList extends Component {
  state = {
    data: []
  };

  handleChange = (path, e) => {
    this.props.context.handleInput(path, "#text", e);
    this.props.context.valueChange();
  };

  componentDidMount() {
    axios
      .get("api/blacklist")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(err));
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    toast.error("error");
  };

  deleteItem = item => {
    const newMeterList = this.state.data.filter(meter => {
      return meter.name !== item.name;
    });

    this.setState({
      data: newMeterList
    });
  };

  handleDelete = item => {
    axios
      .post("api/bldelete", item)
      .then(res => {
        if (res.status === 200) {
          this.deleteItem(item);
          toast.info(`${item.name} deleted`);
        }
      })
      .catch(err => console.log(err));
  };

  deleteAll = () => {
    axios
      .all([this.state.data.map(item => axios.post("api/bldelete", item))])
      .then(res => {
        this.setState({
          data: []
        });
        toast.info("All meters deleted!");
      });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="blacklist-table">
        <MDBContainer className="set-main">
          <h1>Black List</h1>
          <MDBRow className="cont">
            <MDBCol size="12">
              <div>
                <Table>
                  <TableHead style={{ backgroundColor: "#F2F1F1" }}>
                    <TableRow>
                      <TableCell padding="none" align="center">
                        Nr
                      </TableCell>
                      <TableCell align="center" padding="none">
                        SAP
                      </TableCell>
                      <TableCell align="left">Meter Name</TableCell>
                      <TableCell align="right">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data ? (
                      data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            padding="none"
                            component="th"
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell padding="none" align="center">
                            {row.sap}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">
                            <Tooltip title="Delete" placement="right">
                              <DeleteIco
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you wish to delete ${
                                        row.name
                                      }?`
                                    )
                                  )
                                    this.handleDelete(row);
                                }}
                                className="delete-ico"
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <div className="center-default">
                        <div className="spinner-border" role="status" />
                      </div>
                    )}
                  </TableBody>
                </Table>
              </div>
            </MDBCol>
            <MDBCol className="blbutton">
              {this.state.data.length > 0 ? (
                <Tooltip title="Delete all" placement="right">
                  <MDBBtn
                    className="float-right"
                    size="sm"
                    color="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete ALL meters??"
                        )
                      )
                        this.deleteAll();
                    }}
                  >
                    delete all
                  </MDBBtn>
                </Tooltip>
              ) : null}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default dcdata(BlackList);
