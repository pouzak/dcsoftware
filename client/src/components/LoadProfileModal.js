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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: "1000px"
  };
}

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
        //console.log(res);
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
          <tr key={id}>
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
                <ClearSVG className="clear-svg" onClick={this.toggle} />
                <div>
                  <MDBContainer>
                    <Chart meter={this.state.data} />
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

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;

// import React, { Component } from "react";
// import { MDBBtn, MDBModal, MDBModalBody } from "mdbreact";
// import axios from "axios";
// import Chart from "./LoadProfileChart";
// import { ReactComponent as ClearSVG } from "./icons/clear.svg";
// import "./Settings.css";

// class LoadProfileModal extends Component {
//   state = {
//     modal: true,
//     data: null
//   };

//   toggle = () => {
//     this.setState({
//       modal: !this.state.modal
//     });
//     this.props.modal();
//   };
//   componentDidMount() {
//     axios
//       .post("api/loadprofile", this.props.meter)
//       .then(res => {
//         //console.log(res);
//         this.setState({
//           data: res.data
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   render() {
//     const table = this.state.data
//       ? this.state.data.map((item, id) => (
//           <tr key={id}>
//             <th scope="row">{id + 1}</th>
//             <td>{item.clock[0]}</td>
//             <td>{item.status}</td>
//             <td>{item.sumt}</td>
//             <td>{item.avg}</td>
//           </tr>
//         ))
//       : null;

//     return (
//       <div>
//         <MDBModal isOpen={this.state.modal} size="fluid">
//           <h2
//             style={{ padding: "1rem 3rem" }}
//             className="d-flex justify-content-center"
//           >
//             Load Profile [Meter - {this.props.meter.name}, FW -{" "}
//             {this.props.meter.fw}]
//           </h2>
//           <MDBModalBody>
//             <ClearSVG className="clear-svg" onClick={this.toggle} />
//             {this.state.data ? (
//               <div className="profile-container">
//                 <Chart meter={this.state.data} />
//                 <table className="table table-bordered table-hover table-sm">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Clock</th>
//                       <th style={{ width: "4rem" }} scope="col">
//                         Hourly Profile Status
//                       </th>
//                       <th scope="col">Total Energy +A SumT</th>
//                       <th scope="col">Avg. Currrent Period Power +P</th>
//                     </tr>
//                   </thead>
//                   <tbody>{table}</tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="center-default">
//                 <div className="spinner-border" role="status" />
//               </div>
//             )}
//           </MDBModalBody>
//           <div className="d-flex justify-content-center">
//             <MDBBtn color="danger" onClick={this.toggle}>
//               Close
//             </MDBBtn>
//             <MDBBtn color="primary">Save changes</MDBBtn>
//           </div>
//         </MDBModal>
//       </div>
//     );
//   }
// }

// export default LoadProfileModal;
