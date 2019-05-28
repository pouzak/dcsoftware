import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { ReactComponent as ClearSVG } from "./icons/clear.svg";
import "./Settings.css";
import axios from "axios";
import Chart from "./LoadProfileChart";
import { MDBContainer } from "mdbreact";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",

    height: "100%",
    display: "block"
  }
});

class SimpleModal extends React.Component {
  state = {
    open: true,
    data: null
  };
  toggle = () => {
    this.props.modal();
  };

  componentDidMount() {
    axios
      .post("api/loadprofile", this.props.meter)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { classes } = this.props;
    const table = this.state.data
      ? this.state.data.map((item, id) => (
          <tr key={id} style={{ textAlign: "center" }}>
            <th scope="row">{id + 1}</th>
            <td>{item.clock[0]}</td>
            <td>{item.status}</td>
            <td>{item.sumt}</td>
            <td>{item.avg}</td>
          </tr>
        ))
      : null;

    return (
      <div>
        {this.state.data ? (
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            disableEnforceFocus={true}
            style={{ overflow: "hidden" }}
          >
            <div id="modal-style" className={classes.paper}>
              <div>
                <h2
                  style={{ padding: "1rem 3rem" }}
                  className="d-flex justify-content-center"
                >
                  Load Profile [Meter - {this.props.meter.name}, FW -{" "}
                  {this.props.meter.fw}]
                </h2>
                <Tooltip title="Close" placement="right">
                  <ClearSVG className="clear-svg" onClick={this.toggle} />
                </Tooltip>
                <div className="profile-container">
                  <MDBContainer>
                    <Chart meter={this.state.data} />
                    <div className="profile-table">
                      <table className="table table-bordered table-hover table-sm">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Clock</th>
                            <th style={{ width: "4rem" }} scope="col">
                              Hourly Profile Status
                            </th>
                            <th scope="col">Total Energy +A SumT</th>
                            <th scope="col">Avg. Currrent Period Power +P</th>
                          </tr>
                        </thead>
                        <tbody>{table}</tbody>
                      </table>
                    </div>
                  </MDBContainer>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          <div className="center-default">
            <div className="spinner-border" role="status" />
          </div>
        )}
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
