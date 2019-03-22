import React, { Component } from 'react'
import {Consumer} from '../Context';
import './Settings.css';
import Checkbox from '@material-ui/core/Checkbox';
import {MDBRow, MDBCol, MDBBtn, MDBContainer, MDBInput} from "mdbreact";
import {dcdata} from '../Context';


class Ethernet extends Component {
  state = {
    data: ''
  }

  
  dataChange = () => {
        let st = this.props.context.data;
        st.config.settings.ethernet.ethernet_type.dhcp['@bool'] === "true" ? st.config.settings.ethernet.ethernet_type.dhcp['@bool'] ="false" : st.config.settings.ethernet.ethernet_type.dhcp['@bool'] = "true"
        this.setState({
          data: st
        })
        this.props.context.valueChange()
  }

  setData = () => {
    if(this.props.context.data != null) (
      this.setState({
        data: this.props.context.data})
    )
  }

  handleInputChange = (e) => {
    
    //this.setState({ data: { ...this.props.context.data.config.settings.ethernet, dns_server: e.target.value} });
    //const state = this.state.config.settings.ethernet.dns_server
    //console.log(this.state)
    
  }
  async componentWillMount(){
  

    try {
      const contextData = await this.props.context.data;
      if(contextData){
        console.log('yes')
        this.setState({
          data: contextData
        })
        console.log(contextData)
      } else{
        console.log('no')
      }
        /* this.setState({
          data: contextData
        }) */
      
    } catch (error) {
      console.log(error);
    }

}
 


  render() {
    return (
      <div>
         <Consumer>
            {value => {
                let {data} = value;
         
                // style={{border: "2px solid red"}}
                
                return (
                <div>
                 {data ? ( 
                 <MDBContainer className="set-main allign-center">
                 <h1>DCU Configuration</h1>
                 {/* <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> */}
                 <MDBRow className="cont">
                  <MDBCol size="3">
                     <h3>Primary DNS: </h3>
                  </MDBCol>

                  <MDBCol size="2">
                  <input type="text" id="example1" className="form-control" onChange={this.handleInputChange}/>
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






/* <MDBContainer className="set-main">
<h1>DCU Configuration</h1>
{ <p>{data.config.settings.ethernet.ethernet_type.dhcp['@bool']}</p> }
<MDBRow>
 <MDBCol size="8" className="cont">
    <h3>Primary DNS: </h3>
    
    <input type="text" id="example1" className="form-control" />
    <div><MDBBtn color="primary" onClick={() => this.props.context.valueChange()}>Change</MDBBtn></div>
  </MDBCol>
</MDBRow>
</MDBContainer>
 */









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
