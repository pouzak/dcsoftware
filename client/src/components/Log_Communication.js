import React, { Component } from "react";
import { ReactComponent as NavigationIcon } from "./icons/arrow_up.svg";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Settings.css";
import Fab from "@material-ui/core/Fab";
import { MDBAnimation } from "mdbreact";

export class Log_PLC extends Component {
  state = {
    data: [],
    count: 30,
    start: 1,
    query: "",
    search_limit: 100
  };

  componentDidMount() {
    const { count, start } = this.state;
    axios
      .post(`/api/commlog?count=${count}&start=${start}`)
      .then(res =>
        this.setState({ data: res.data, start: this.state.start + count })
      );
  }

  fetchData = () => {
    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .post(`/api/commlog?count=${count}&start=${start}`)
      .then(res => this.setState({ data: this.state.data.concat(res.data) }));
  };

  handleInputChange = event => {
    this.setState(
      {
        query: event.target.value
      },
      () => {
        if (this.state.query.length > 2) {
          axios
            .post(
              `/api/commlog?search=${this.state.query}&limit=${
                this.state.search_limit
              }`
            )
            .then(this.setState({ start: 1, count: 30 }))
            //.then(response => response.json())
            .then(res => this.setState({ data: res.data }));
        } else if (!this.state.query) {
          this.setState({ start: 1, data: [], count: 30 });
          this.fetchData();
        }
      }
    );
  };

  handleChange = e => {
    this.setState({
      search_limit: e.target.value
    });
  };

  top = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const arrow =
      this.state.start > 59 ? (
        <div className="arrow-up">
          <Fab
            color="secondary"
            aria-label="Add"
            onClick={() => this.top()}
            style={{ outline: "none" }}
          >
            <NavigationIcon style={{ fill: "white" }} />
          </Fab>
        </div>
      ) : null;

    const nodata =
      !this.state.data.length > 0 && this.state.query ? (
        <h2>No results.</h2>
      ) : null;

    const table = this.state.data
      ? this.state.data.map((item, id) => (
          <tr key={id}>
            {item.length > 60 ? (
              <td style={{ color: "blue" }}>{item}</td>
            ) : (
              <td>{item}</td>
            )}
          </tr>
        ))
      : null;

    return (
      <div className="plc-root">
        {arrow}
        <div className="stats-input">
          <input
            className="form-control"
            placeholder={"Search log..."}
            value={this.state.query}
            onChange={this.handleInputChange}
          />

          <select
            className="browser-default custom-select "
            //defaultValue="Results limit"
            onChange={this.handleChange}
          >
            <option value="" selected hidden>
              Result Limit
            </option>
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="20">20</option>
          </select>
        </div>
        {nodata}
        {this.state.query ? (
          <div className="plc-table">
            <table className="table table-bordered table-hover table-sm">
              <tbody>{table}</tbody>
            </table>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.fetchData}
            hasMore={true}
            loader={<h4>Updating...</h4>}
          >
            <div className="plc-table">
              <table className="table table-bordered table-hover table-sm">
                <tbody>{table}</tbody>
              </table>
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default Log_PLC;
