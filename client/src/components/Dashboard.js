import React, { Component } from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CountUp from 'react-countup';
import {Consumer} from '../Context';
import './Dashboard.css';
import {Link} from 'react-router-dom';


class Test extends Component {
  render() {
    return (
      <Consumer>
      {value => {
            const {data} = value;
            //console.log(data)
            return (
            <div className="centered">
              {data ? (
                <MDBRow >
                <MDBCol className="dashboard">
        
                    <h3 className="dash-title display-4">Data Concentrator DC12 </h3>
                    <h3 className="welcome">
                      Welcome to DC12 dashboard v.0.1. 
                    </h3>
                    <p className="lead">
                      Current DCU Stats: 
                    </p>
                    <p>Memory Usage: <CountUp end={Math.floor(Math.random() * 400) + 6000} duration={0.4}/> KB</p>
                    <p>CPU Load: <CountUp end={Math.floor(Math.random() * 15) + 2} duration={1}/> %</p>
                    <p className="lead">
                    <Link to="/">
                      <MDBBtn color="primary">Refresh</MDBBtn>
                      </Link>
                      <Link to="/">
                      <MDBBtn color="danger">Restart</MDBBtn>
                      </Link>
                    </p>
              
                </MDBCol>
              </MDBRow>
                ):(
                
                <div class="spinner-border" role="status"></div>
            
                )}
            </div>
            
            )
          }}
    </Consumer>
    )
  }
}

export default Test

/*<div>
        <MDBContainer className="text-center">
        <MDBRow >
        <MDBCol>

            <h2 className="h1 display-3">Hello, world!</h2>
            <p className="lead">
              This is a simple hero unit, a simple Jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr className="my-2" />
            <p>
            <CountUp end={1890} duration={1}/> KB
            </p>
            <p className="lead">
              <MDBBtn color="primary">Learn More</MDBBtn>
            </p>
      
        </MDBCol>
      </MDBRow>
     
        </MDBContainer>
      </div>

      {data.config.statistics.plc_statistics.com_quality['@value']}


      <CountUp end={data.config.statistics.plc_statistics.com_quality['@value']} duration={1}/>
      */
