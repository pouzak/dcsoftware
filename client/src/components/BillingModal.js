import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import axios from 'axios';
import Chart from './BillingChart'


class BillingModal extends Component {
  state={
    modal: true,
    data: null
  }
  
  toggle = () => {
  
    this.setState({
      modal: !this.state.modal
    });
   this.props.modal()
  }
 componentDidMount(){
 
    axios
    .post('api/billing', this.props.meter)
    .then(res => { 
      //console.log(res)
      this.setState({
        data: res.data
      })
    })
    .catch(err => console.log(err))
  


 }
 
  render() {
    const table = this.state.data ? (this.state.data.map(item => 
      (<tr>
        <th scope="row">{item.id}</th>
        <td>{item.clock[0]}</td>
        <td>{item.asumt}</td>
        <td>{item.at1}</td>
        <td>{item.at2}</td>
        <td>{item.at3}</td>
        <td>{item.at4}</td>
        <td>{item.rsumt}</td>
        <td>{item.rt1}</td>
        <td>{item.rt2}</td>
        <td>{item.rt3}</td>
        <td>{item.rt4}</td>
        <td>{item.r_sumt}</td>
        <td>{item.power}</td>
        
    </tr>)
    )) : (null)
    
    return (
      <div>
        <MDBModal isOpen={this.state.modal} size="fluid" >
        <MDBModalHeader className="d-flex justify-content-center">Billing Information  [Meter - {this.props.meter.name}, FW - {this.props.meter.fw}]</MDBModalHeader>
        <MDBModalBody>
          
          {this.state.data ? (
            <div style={{padding: "0px 50px"}}> 
              <Chart meter={this.state.data} />
            <p><table class="table table-bordered table-hover table-sm table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Clock</th>
                <th scope="col">Total Energy +A SumT (kWH)</th>
                <th scope="col">Total Energy +A T1 (kWH)</th>
                <th scope="col">Total Energy +A T2 (kWH)</th>
                <th scope="col">Total Energy +A T3 (kWH)</th>
                <th scope="col">Total Energy +A T4 (kWH)</th>
                <th scope="col">Total Energy +R SumT (kvarh)</th>
                <th scope="col">Total Energy +R T1 (kvarh)</th>
                <th scope="col">Total Energy +R T2 (kvarh)</th>
                <th scope="col">Total Energy +R T3 (kvarh)</th>
                <th scope="col">Total Energy +R T4 (kvarh)</th>
                <th scope="col">Total Energy -R SumT (kvarh)</th>
                <th scope="col">Billing Period +P Max (kW)</th>
                
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table></p>
          </div>
          ): (<div className="center-default">
                <div class="spinner-border" role="status"></div>
              </div>)}

          
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle}>Close</MDBBtn>
          {/* <MDBBtn color="primary">Save changes</MDBBtn> */}
        </MDBModalFooter>
      </MDBModal>
      </div>
    )
  }
}

export default BillingModal
