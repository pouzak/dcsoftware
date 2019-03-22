import React, { Component } from "react";
import Chart from "react-apexcharts";

class BillingChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '55%',
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
    }
  }
  componentDidMount(){
    const names = ['id','clock',
    'Total Energy +A SumT (kWH)',
    'Total Energy +A T1 (kWH)',
    'Total Energy +A T2 (kWH)',
    'Total Energy +A T3 (kWH)',
    'Total Energy +A T4 (kWH)',
    'Total Energy +R SumT (kvarh)',
    'Total Energy +R T1 (kvarh)',
    'Total Energy +R T2 (kvarh)',
    'Total Energy +R T3 (kvarh)',
    'Total Energy +R T4 (kvarh)',
    'Total Energy -R SumT (kvarh)',
    'Billing Period +P Max (kW)']

    const ids = ['id','clock','asumt','at1','at2','at3','at4','rsumt','rt1','rt2','rt3','rt4','r_sumt','power']

    let clock = this.props.meter.map(item => item.clock[0]) 
    let res = []
    var i;
    for (i = 0; i < ids.length; i++) { 
      let obj = {}
      obj.name = names[i]
      obj.data = this.props.meter.map(item => item[ids[i]])
      res.push(obj)
    }
    console.log(res)
    this.setState({
      options : {
        xaxis: {
          categories: clock
        }
      },
      series: res.slice(2)
    }) 
   
    
  }

  render() {
    //console.log(this.props.meter)
    return (
      

      <div id="chart">
        {this.state.series ? (
          <Chart options={this.state.options} series={this.state.series} type="bar" height="350" />
        ): (<p>Loading..</p>) }
      </div>

    
    
    
)
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
