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

        /*  var i;
    for (i = 0; i < ids.length; i++) {
      let obj = {};
      obj.name = names[i];
      obj.data = this.props.meter.map(item => item[ids[i]]);
      res.push(obj);
    } */

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

/* import React, { Component } from 'react';
import { Chart } from "react-charts";
import CountUp from 'react-countup';

class BlackList extends Component {
  render() {
    const lineChart = (
      // A react-chart hyper-responsively and continuusly fills the available
      // space of its parent element automatically
      //<CountUp end={} duration={0.8}/>
      
        <Chart
          data={[
            {
              label: "Series 1",
              data: [[11, 28],
               [11, 28],
                [22, 48], 
                [33, 62], 
                [44, 79]]
            },
            {
              label: "Series 2",
              data: [[10, 23], [14, 31], [22, 35], [33, 46], [64, 44]]
            }
          ]}
          axes={[
            { primary: true, type: "linear", position: "bottom" },
            { type: "linear", position: "left" }
          ]}
          primaryCursor
        secondaryCursor
        tooltip
        />
      )
    return (
      <div
    style={{
      width: "80%",
      height: "80%"
    }}
  >
      {lineChart}
  </div> 
    )
  }
}

export default BlackList */

/* 
this.state = {
  options: {
    annotations: {
      yaxis: [
        {
          y: 8200,
          borderColor: "#00000",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396"
            },
            text: "Y Axis Annotation"
          }
        }
      ]},
    plotOptions: {
      bar: {
        horizontal: true,
        endingShape: 'rounded',
        columnWidth: '55%',
        dataLabels: {
          position: 'top'
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: null,
      //categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  },
  series: null,
 /*  series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }], */
