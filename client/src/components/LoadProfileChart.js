import React, { Component } from "react";
import Chart from "react-apexcharts";

class BillingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null
    };
  }

  componentDidMount() {
    let clock = [];
    let total = [];
    let avg = [];

    this.props.meter.map(item => {
      clock.push(String(item.clock[0]));
      total.push(item.sumt);
      avg.push(item.avg);
    });

    this.setState({
      options: {
        chart: {
          animations: {
            enabled: true,
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
        title: {
          text: "Profile Load"
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
