import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

class BillingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null
    };
  }

  componentDidMount() {
    axios
      .post("api/loadprofile", this.props.meter)
      .then(res => {
        let clock = [];
        let total = [];
        let avg = [];

        res.data.map(item => {
          clock.push(String(item.clock[0]));
          total.push(item.sumt);
          avg.push(item.avg);
        });

        this.setState({
          options: {
            chart: {
              animations: {
                enabled: false,
                easing: "easeinout",
                speed: 300,
                animateGradually: {
                  enabled: true,
                  delay: 50
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
              toolbar: {
                show: false
              },
              zoom: {
                enabled: true
              }
            },
            stroke: {
              width: [0, 4]
            },

            labels: clock,

            yaxis: [
              {
                title: {
                  text: "Total Energy +A SumT"
                }
              },
              {
                opposite: true,
                title: {
                  text: "Avg. Currrent Period Power +P"
                }
              }
            ]
          },
          series: [
            {
              name: "Total Energy +A SumT",
              type: "area",
              data: total
            },
            {
              name: "Avg. Currrent Period Power +P",
              type: "line",
              data: avg
            }
          ]
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
            type="line"
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
