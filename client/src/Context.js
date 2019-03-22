import React, { Component } from 'react';
import { withContext } from "with-context";
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        dc_data: null
      }

      
      componentDidMount(){
        axios
        .get('api/cfg')
        .then(res => {
          this.setState({dc_data: res.data});
          //console.log(this.state.dc_data)
        })
        .catch(err => console.log(err));
      }

      
      valueChange = (item) => {
        axios
        .post('api/save',this.state.dc_data)
        .then(res => {
          //console.log(res);
        })
        .catch(err => console.log(err));
        
      }
     
      

  render() {
    return (
      <Context.Provider value={{
          data: this.state.dc_data,
          valueChange: this.valueChange 
          }}>
          {this.props.children}
      </Context.Provider>
    )
  }
}
export const dcdata = withContext(Context);
export const Consumer = Context.Consumer;

