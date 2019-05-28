import React, { Component } from "react";
import "./Settings.css";
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from "mdbreact";
//import CountUp from 'react-countup';
import Chart from "react-apexcharts";

class dcuStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "CPU Load",
      value: "days",
      count: 1,
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          },
          width: "100%"
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },

        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },

        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: [
        {
          name: "Statistics",
          data: []
        }
      ]
    };
  }

  handleChange = e => {
    this.setState({
      current: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let numbers = [];
    let i = 0;
    if (!isNaN(e.target.name.value)) {
      for (i; i < e.target.name.value * 6; i++) {
        if (this.state.current === "CPU Load") {
          numbers.push(Math.floor(Math.random() * 15) + 15);
        } else if (this.state.current === "Temperature") {
          numbers.push(Math.floor(Math.random() * 5) + 40);
        } else {
          numbers.push(Math.floor(Math.random() * 400) + 6000);
        }
      }

      this.setState({
        count: e.target.value,
        series: [
          {
            name: this.state.current,
            data: numbers
          }
        ]
      });
    }
  };

  render() {
    return (
      <div>
        <MDBContainer className="set-main">
          <h1>DC Statistics</h1>
          <MDBRow className="cont">
            <MDBCol size="3">
              <h3 className="float-right">Choose to display:</h3>
            </MDBCol>

            <MDBCol size="2">
              <select
                className="browser-default custom-select "
                defaultValue={this.state.current}
                onChange={this.handleChange}
              >
                <option value="CPU Load">CPU Load</option>
                <option value="Temperature">Temperature</option>
                <option value="RAM Usage">RAM Usage</option>
              </select>
            </MDBCol>
            <MDBCol size="3">
              <h3 className="float-right">Time period (hours):</h3>
            </MDBCol>
            <MDBCol size="3">
              <MDBRow>
                <form
                  className="cont"
                  ref="form"
                  onSubmit={e => this.handleSubmit(e)}
                  value={this.state.count}
                >
                  <input
                    style={{ width: "5rem" }}
                    type="number"
                    id="name"
                    className="form-control"
                  />

                  <MDBBtn color="primary" size="md" type="submit">
                    show
                  </MDBBtn>
                </form>
              </MDBRow>
            </MDBCol>
          </MDBRow>

          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height="400"
          />
        </MDBContainer>
      </div>
    );
  }
}

export default dcuStats;
