import React, { Component } from "react";
import {
  MDBDataTable,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import axios from "axios";
import BillingModal from "./BillingModal";
import LoadProfile from "./LoadProfileModal";
import "./Settings.css";

/* const data = {
  columns: [
    { */

const columns = [
  {
    label: "Name",
    field: "name",
    sort: "asc",
    width: 150
  },
  {
    label: "Mac",
    field: "mac",
    sort: "asc",
    width: 200
  },
  {
    label: "LNID",
    field: "lnid",
    sort: "asc",
    width: 100
  },
  {
    label: "Availability",
    field: "availability",
    sort: "asc",
    width: 60
  },
  {
    label: "FW",
    field: "fw",
    sort: "asc",
    width: 50
  },
  {
    label: "Statistics",
    field: "stats",
    sort: "asc",
    width: 100
  }
];

export class List extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      modalBilling: false,
      modalProfile: false,
      currentMeter: null
    };
  }
  handleBilling = item => {
    this.setState({
      modalBilling: true,
      currentMeter: item
    });
  };

  handleProfile = item => {
    this.setState({
      modalProfile: true,
      currentMeter: item
    });
  };

  modalState = () => {
    this.setState({
      modalBilling: false,
      modalProfile: false
    });
  };

  componentDidMount() {
    axios
      .get("api/meterslist")
      .then(res => {
        const parsedData = res.data.map((item, id) => {
          let obj = {};
          obj.name = item.name;
          obj.mac =
            item.mac.slice(0, 2) +
            ":" +
            item.mac.slice(2, 4) +
            ":" +
            item.mac.slice(4, 6) +
            ":" +
            item.mac.slice(6, 8) +
            ":" +
            item.mac.slice(8, 10) +
            ":" +
            item.mac.slice(10, 12);
          obj.lnid = item.lnid;
          obj.availability = item.availability;
          obj.FW = item.fw;
          obj.stats = [
            <MDBBtnGroup key={id}>
              <MDBDropdown>
                <MDBDropdownToggle
                  caret
                  color="info"
                  className="h-100"
                  size="sm"
                >
                  Stats
                </MDBDropdownToggle>
                <MDBDropdownMenu basic color="info">
                  <MDBDropdownItem onClick={() => this.handleBilling(item)}>
                    Billing
                  </MDBDropdownItem>
                  {item.profile ? (
                    <MDBDropdownItem onClick={() => this.handleProfile(item)}>
                      Load Profile
                    </MDBDropdownItem>
                  ) : null}
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
          ];
          return obj;
        });

        /* <MDBBtn color="purple" onClick={() => this.handleRowClick(item.name)} outline size="sm">Billing</MDBBtn>
    ,<MDBBtn color="purple" onClick={() => this.handleRowClick(item.name)} outline size="sm">Billing</MDBBtn>]
 */

        //console.log(res);
        parsedData.shift();
        this.setState({ data: { columns, rows: parsedData } });
      })
      .catch(err => console.log(err));
  }

  render() {
    //console.log(data)
    const table = this.state.data ? (
      <div style={{ padding: "3%" }}>
        <MDBDataTable
          //striped
          sortable={false}
          bordered
          hover
          small
          //data={this.state.data}
          data={this.state.data}
          entries={9}
          entriesOptions={[5, 10, 15, 100]}
          className="meter-table"
        />
      </div>
    ) : (
      <div className="center-default">
        <div className="spinner-border" role="status" />
      </div>
    );
    return (
      <div style={{ padding: "50px" }}>
        {this.state.modalBilling ? (
          <BillingModal
            modal={this.modalState}
            meter={this.state.currentMeter}
          />
        ) : null}

        {this.state.modalProfile ? (
          <LoadProfile
            modal={this.modalState}
            meter={this.state.currentMeter}
          />
        ) : null}
        {table}
      </div>
    );
  }
}

export default List;
