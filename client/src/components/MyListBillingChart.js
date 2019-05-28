import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

class BillingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null,
      data: null
    };
  }

  componentDidMount() {
    axios
      .post("api/billing", this.props.meter)
      .then(result => {
        const names = [
          "id",
          "clock",
          "Total Energy +A SumT (kWH)",
          "Total Energy +A T1 (kWH)",
          "Total Energy +A T2 (kWH)",
          "Total Energy +A T3 (kWH)",
          "Total Energy +A T4 (kWH)",
          "Total Energy +R SumT (kvarh)",
          "Total Energy +R T1 (kvarh)",
          "Total Energy +R T2 (kvarh)",
          "Total Energy +R T3 (kvarh)",
          "Total Energy +R T4 (kvarh)",
          "Total Energy -R SumT (kvarh)",
          "Billing Period +P Max (kW)"
        ];

        const ids = [
          "id",
          "clock",
          "asumt",
          "at1",
          "at2",
          "at3",
          "at4",
          "rsumt",
          "rt1",
          "rt2",
          "rt3",
          "rt4",
          "r_sumt",
          "power"
        ];

        let clock = result.data.map(item => item.clock[0]);
        let res = [];
        var i;
        for (i = 0; i < ids.length; i++) {
          let obj = {};
          obj.name = names[i];
          obj.data = result.data.map(item => item[ids[i]]);
          res.push(obj);
        }

        this.setState({
          options: {
            chart: {
              toolbar: {
                show: false
              },
              animations: {
                enabled: false
              },
              zoom: {
                enabled: true
              }
            },
            legend: {
              show: false,
              position: "top",
              offsetX: -10,
              offsetY: 0
            },
            responsive: [
              {
                breakpoint: 480
              }
            ],
            dataLabels: {
              enabled: false
            },
            plotOptions: {
              bar: {
                horizontal: false
              }
            },

            xaxis: {
              categories: clock
            },
            yaxis: {
              title: {
                text: "Total Energy"
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {}
          },
          series: res.slice(2)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div id="chart">
        {this.state.series ? (
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height="350"
          />
        ) : (
          <p>Loading..</p>
        )}
      </div>
    );
  }
}

export default BillingChart;
