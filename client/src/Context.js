import React, { Component } from "react";
import { withContext } from "with-context";
import axios from "axios";
import { toast } from "react-toastify";

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
      })
      .catch(err => console.log(err));
  }

  validation = (regexp, item, error) => {
    if (!regexp.test(item)) {
      toast.error(error);
      return false;
    } else {
      return true;
    }
  };

  checkInputValidation = () => {
    if (
      this.validation(
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        this.state.dc_data.config.settings.ethernet.ip_address,
        "Please enter valid IP address!"
      ) &&
      this.validation(
        /^((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254)))))$/,
        this.state.dc_data.config.settings.ethernet.subnet_mask,
        "Please enter valid Subnet Mask address!"
      ) &&
      this.validation(
        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        this.state.dc_data.config.settings.ethernet.default_gateway,
        "Please enter valid Default Gateway address!"
      ) &&
      this.validation(
        /// /^[0-9]+([.][0-9]+){3}$/
        /^\d+(\.\d{1,3}){3}$/,
        this.state.dc_data.config.settings.ethernet.dns_server,
        "Please enter valid DNS server address!"
      ) &&
      this.validation(
        /// /^[0-9]+([.][0-9]+){3}$/
        /^\d+(\.\d{1,3}){3}$/,
        this.state.dc_data.config.settings.ethernet.dns_server2,
        "Please enter valid DNS server address!"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  valueChange = () => {
    if (this.checkInputValidation()) {
      axios
        .post("api/save", this.state.dc_data)
        .then(res => {
          console.log("cfg rewrited");
        })
        .catch(err => console.log(err));
      return true;
    } else {
      return false;
    }
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
      toast.success(`${item.name} added to list!`);
    } else {
      toast.error(`${item.name} is already in the list!`);
    }
  };

  deleteFromList = name => {
    const newList = this.state.myList.filter(item => {
      return item.name !== name;
    });
    this.setState({
      myList: newList
    });
    toast.info(`${name} deleted from list!`);
  };

  addToBlackList = item => {
    axios
      .post("api/bladd", item)
      .then(res => {
        if (res.status === 200) {
          toast.success(`${item.name} added to Black List!`);
        } else if (res.status === 204) {
          toast.error(`${item.name} is already in the list!`);
        }
      })
      .catch(err => console.log(err));
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
          checkInputValidation: this.checkInputValidation,
          deleteFromList: this.deleteFromList,
          addToBlackList: this.addToBlackList
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const dcdata = withContext(Context);
export const Consumer = Context.Consumer;
