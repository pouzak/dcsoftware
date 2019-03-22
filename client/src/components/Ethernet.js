import React, { Component } from 'react'
import {Consumer} from '../Context';
import './Settings.css';
import Checkbox from '@material-ui/core/Checkbox';
import {MDBRow, MDBCol, MDBBtn, MDBContainer} from "mdbreact";
import {dcdata} from '../Context';


class Ethernet extends Component {
  state = {
    dataa: null
  }

  dataChange = () => {
        let st = this.props.context.data;
        st.config.settings.ethernet.ethernet_type.dhcp['@bool'] === "true" ? st.config.settings.ethernet.ethernet_type.dhcp['@bool'] ="false" : st.config.settings.ethernet.ethernet_type.dhcp['@bool'] = "true"
        this.setState({
          dataa: st
        })
        this.props.context.valueChange()
  }

  render() {
    return (
      <div>
         <Consumer>
            {value => {
                let {data} = value;
                console.log(data)
                
                return (
                <div>
                 {data ? ( 
                <MDBContainer className="set-main">
                  <h1>Ethernet</h1>
                  {/* <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> */}
                  <MDBRow className="cont">
                  <MDBCol size="3">
                     <h3>Primary DNS: </h3>
                  </MDBCol>

                  <MDBCol size="2">
                  <Checkbox
                  checked={JSON.parse(data.config.settings.ethernet.ethernet_type.dhcp['@bool'])}
                  onChange={() => this.dataChange()}
                    value="checked"
                    color="secondary"
                    
                    />
                  </MDBCol>

                  <MDBCol size="2">
                  <div><MDBBtn color="primary" size="md" onClick={() => this.props.context.valueChange()}>Change</MDBBtn></div>
                  </MDBCol>
                   
                 </MDBRow>
              </MDBContainer>
                ):(
                
                <div class="spinner-border" role="status"></div>
            
                )}
                </div>
            
            
            )
          }}
    </Consumer>
      </div>
    )
  }
}

export default dcdata(Ethernet)

{/* <MDBRow>
<MDBCol size="4">.col-4</MDBCol>
<MDBCol size="4">.col-4</MDBCol>
<MDBCol size="4">.col-4</MDBCol>
</MDBRow>
 */}
//() => this.props.context.valueChange(this.state.data)

//this.props.context.data ? (this.setState({data: this.props.context.data})):(console.log("no"))

/*
this.setState({
      data: this.props.context.data
    })
<MDBBtn color="primary" onClick={() => this.props.context.valueChange()}>run</MDBBtn>






 dataChange = () => {
    const st = this.props.context.data;
        st.config.settings.ethernet.ethernet_type.dhcp['@bool'] === "true" ? st.config.settings.ethernet.ethernet_type.dhcp['@bool'] ="false" : st.config.settings.ethernet.ethernet_type.dhcp['@bool'] = "true"
        this.setState({
          data:st
        })
        console.log(this.state.data)
  }

*/
