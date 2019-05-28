import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { ReactComponent as ClearSVG } from "./icons/clear.svg";
import "./Settings.css";
import axios from "axios";
import Chart from "./BillingChart";
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
      .post("api/billing", this.props.meter)
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
            <th scope="row">{item.id}</th>
            <td>{item.clock[0]}</td>
            <td>{item.asumt}</td>
            <td>{item.at1}</td>
            <td>{item.at2}</td>
            <td>{item.at3}</td>
            <td>{item.at4}</td>
            <td>{item.rsumt}</td>
            <td>{item.rt1}</td>
            <td>{item.rt2}</td>
            <td>{item.rt3}</td>
            <td>{item.rt4}</td>
            <td>{item.r_sumt}</td>
            <td>{item.power}</td>
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
          >
            <div id="modal-style-billing" className={classes.paper}>
              <div>
                <h2
                  style={{ padding: "1rem 3rem" }}
                  className="d-flex justify-content-center"
                >
                  Billing Information [Meter - {this.props.meter.name}, FW -
                  {this.props.meter.fw}]
                </h2>
                <Tooltip title="Close" placement="right">
                  <ClearSVG className="clear-svg" onClick={this.toggle} />
                </Tooltip>
                <div>
                  <div className="billing-modal-container">
                    <Chart meter={this.state.data} />

                    <table className="table table-bordered table-hover table-sm table-responsive">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Clock</th>
                          <th scope="col">Total Energy +A SumT (kWH)</th>
                          <th scope="col">Total Energy +A T1 (kWH)</th>
                          <th scope="col">Total Energy +A T2 (kWH)</th>
                          <th scope="col">Total Energy +A T3 (kWH)</th>
                          <th scope="col">Total Energy +A T4 (kWH)</th>
                          <th scope="col">Total Energy +R SumT (kvarh)</th>
                          <th scope="col">Total Energy +R T1 (kvarh)</th>
                          <th scope="col">Total Energy +R T2 (kvarh)</th>
                          <th scope="col">Total Energy +R T3 (kvarh)</th>
                          <th scope="col">Total Energy +R T4 (kvarh)</th>
                          <th scope="col">Total Energy -R SumT (kvarh)</th>
                          <th scope="col">Billing Period +P Max (kW)</th>
                        </tr>
                      </thead>
                      <tbody>{table}</tbody>
                    </table>
                  </div>
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
