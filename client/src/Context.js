import React, { Component } from "react";
import { withContext } from "with-context";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    dc_data: null,
    myList: []
  };

  componentDidMount() {
    axios
      .get("api/cfg")
      .then(res => {
        this.setState({ dc_data: res.data });
        //console.log(this.state.dc_data)
      })
      .catch(err => console.log(err));
  }

  valueChange = () => {
    axios
      .post("api/save", this.state.dc_data)
      .then(res => {
        //console.log(res);
      })
      .catch(err => console.log(err));
  };

  handleCheckbox = path => {
    let st = path;
    st["@bool"] === "true" ? (st["@bool"] = "false") : (st["@bool"] = "true");
    this.setState({
      data: st
    });
    this.valueChange();
  };

  handleInputChange = (path, item, e) => {
    //console.log(path, item, e.target.value);
    const newState = Object.assign({}, this.state);
    var res = path.split(".").reduce(function(o, k) {
      return o && o[k];
    }, newState);
    res[item] = e.target.value;
    this.setState(newState);
  };

  handleMyList = item => {
    const find = this.state.myList.find(it => it.name === item.name);

    if (!find) {
      const d = new Date();
      var datestring =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        ", " +
        d.getHours() +
        ":" +
        d.getMinutes();
      item.date = datestring;
      this.setState({
        myList: [...this.state.myList, item]
      });
    }
  };

  deleteFromList = name => {
    const newList = this.state.myList.filter(item => {
      return item.name !== name;
    });
    this.setState({
      myList: newList
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          data: this.state.dc_data,
          valueChange: this.valueChange,
          handleInput: this.handleInputChange,
          checkbox: this.handleCheckbox,
          handleMyList: this.handleMyList,
          myList: this.state.myList,
          deleteFromList: this.deleteFromList
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const dcdata = withContext(Context);
export const Consumer = Context.Consumer;
