import React, { Component } from 'react'
import { MDBAnimation } from "mdbreact";

export class Page404 extends Component {
  render() {
    return (
      <div className="center-default">
      <MDBAnimation type="bounceIn">
        <MDBAnimation type="pulse" infinite><h1 style={{fontSize:"7rem", color:"red"}}>404 </h1></MDBAnimation>
        <br/>
        <h2>{this.props.location.pathname}</h2>
        <br/>
        <h1>Page not found</h1>
        </MDBAnimation>
      </div>
    )
  }
}

export default Page404
