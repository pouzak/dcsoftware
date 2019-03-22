import React, { Component } from 'react'
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CountUp from 'react-countup';
import {Consumer} from '../Context';
import './Dashboard.css';
import {Link} from 'react-router-dom';


let memory;
let cpu;

class Test extends Component {
  componentDidMount() {
    memory = <CountUp end={Math.floor(Math.random() * 400) + 6000} duration={0.4}/>
    cpu = <CountUp end={Math.floor(Math.random() * 15) + 2} duration={1}/>
  }
  render() {
    return (
     <div className="centered">
        <MDBRow >
          <MDBCol className="dashboard">
  
              <h3 className="dash-title display-4">Data Concentrator DC12 </h3>
              <h3 className="welcome">
                Welcome to DC12 dashboard v.0.1. 
              </h3>
              <p className="lead">
                Current DCU Stats: 
              </p>
              <p>Memory Usage: {memory} KB</p>
              <p>CPU Load: {cpu} %</p>
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
     </div>
       
          

    )
  }
}

export default Test

{/* <Consumer>
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
              <p>Memory Usage: {memory} KB</p>
              <p>CPU Load: {cpu} %</p>
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
</Consumer> */}