import React, { Component } from 'react';
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

export default BlackList
