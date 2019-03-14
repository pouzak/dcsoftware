import React, { Component } from 'react'
import './Navbar.css';
import { MDBAnimation } from "mdbreact";
import {Link} from 'react-router-dom';

export class Navbar2 extends Component {
  render() {
    return (
      <div>
        <nav class="navigation">
<ul class="mainmenu">
<MDBAnimation type="fadeInUp" duration="500ms">
<Link to="/"><a href="">Home</a></Link>
</MDBAnimation>
<MDBAnimation type="fadeInUp" duration="550ms">
  <li><a href="">PLC Network</a>
  <ul class="submenu">
  <Link to="/meterstats"><li><a href="">Meter Statistics</a></li></Link>
      <li><a href="" >Topology</a></li>
      <Link to="/black_list">
      <li><a >Black List</a></li>
      </Link>
    </ul>
  </li>
  </MDBAnimation>
  <MDBAnimation type="fadeInUp" duration="650ms">
  <li><a href="">Settings</a>
  <ul class="submenu">
      <li><a href="">DCU configuration</a></li>
      <li><a href="">Date / Time</a></li>
      <li> <Link to="/ethernet"><a href="">Ethernet</a></Link></li>
      <li><a href="">Modem</a></li>
      <li><a href="">Security</a></li>
    </ul></li>
    </MDBAnimation>
    <MDBAnimation type="fadeInUp" duration="790ms">
  <li><a href="">Statistics</a>
    <ul class="submenu">
      <li><a href="">DCU Statistics</a></li>
      <li><a href="">PLC Statistics</a></li>
      <li><a href="">Connection Statistics</a></li>
      <li><a href="">System Info</a></li>
    </ul>
  </li>
  </MDBAnimation>
  <MDBAnimation type="fadeInUp" duration="880ms">
  <li><a href="">Tasks</a>
    <ul class="submenu">
      <li><a href="">Add Task</a></li>
      <li><a href="">Schedulle</a></li>
    </ul>
  </li>
  </MDBAnimation>
  <MDBAnimation type="fadeInUp" duration="1100ms">
  <li><a href="">Firmware Update</a>
    <ul class="submenu">
      <li><a href="">DCU Firmware</a></li>
      <li><a href="">Meters Firmware</a></li>
    </ul>
  </li>
  </MDBAnimation>
</ul>
</nav> 
      </div>
    )
  }
}

export default Navbar2


{/* <Animation type="fadeInLeft" duration="500ms">
  <img src="https://mdbootstrap.com/img/logo.png" alt="Transparent MDB Logo"/>
</Animation> */}