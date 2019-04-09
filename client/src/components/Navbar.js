import React, { Fragment, Component } from "react";
import posed from "react-pose";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ReactComponent as YourSvg } from "./icons/home.svg";
import { MDBAnimation } from "mdbreact";

const Content = posed.div({
  closed: { height: 0 },
  open: { height: "auto" }
});

export class Navbar extends Component {
  state = { open: false };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Fragment>
          {/* <Link to="/"><h1>Home</h1></Link> */}
          <MDBAnimation type="tada">
            <Link to="/">
              {" "}
              <div className="home-div">
                <YourSvg
                  className="home-svg"
                  onClick={() =>
                    this.setState({ open: open === "home" ? false : "home" })
                  }
                />
              </div>
            </Link>
          </MDBAnimation>

          <h2
            className="title"
            onClick={() =>
              this.setState({ open: open === "plc" ? false : "plc" })
            }
          >
            {/* {open === 'plc' ?<MDBAnimation type="rotateIn"><Plus/></MDBAnimation> : ' '}  */}
            PLC Network
          </h2>
          <Content
            className="content"
            pose={open === "plc" ? "open" : "closed"}
          >
            <Link to="/meterstats">
              <div className="content-wrapper">Meter Statistics</div>
            </Link>
            <Link to="/topology">
              <div className="content-wrapper not">Topology</div>
            </Link>
            <Link to="/black_list">
              <div className="content-wrapper not">Black List</div>
            </Link>
          </Content>

          <h2
            className="title"
            onClick={() =>
              this.setState({ open: open === "set" ? false : "set" })
            }
          >
            Settings
          </h2>
          <Content
            className="content"
            pose={open === "set" ? "open" : "closed"}
          >
            <Link to="/dcuconfig">
              <div className="content-wrapper">DCU Configuration</div>
            </Link>
            <Link to="/ethernet">
              <div className="content-wrapper">Ethernet</div>
            </Link>
            <Link to="/modem">
              <div className="content-wrapper not">Modem</div>
            </Link>
            <Link to="/security">
              <div className="content-wrapper not">Security</div>
            </Link>
          </Content>

          <h2
            className="title"
            onClick={() =>
              this.setState({ open: open === "stats" ? false : "stats" })
            }
          >
            Statistics
          </h2>
          <Content
            className="content"
            pose={open === "stats" ? "open" : "closed"}
          >
            <Link to="/dcustats">
              <div className="content-wrapper">DCU Statistics</div>
            </Link>
            <Link to="/plcstats">
              <div className="content-wrapper">PLC Statistics</div>
            </Link>
            <Link to="/connection">
              <div className="content-wrapper not">Connection Statistics</div>
            </Link>
            <Link to="/system">
              <div className="content-wrapper not">System Info</div>
            </Link>
          </Content>

          <h2
            className="title"
            onClick={() =>
              this.setState({ open: open === "task" ? false : "task" })
            }
          >
            Tasks
          </h2>
          <Content
            className="content"
            pose={open === "task" ? "open" : "closed"}
          >
            <Link to="/addtask">
              <div className="content-wrapper not">Add Task</div>
            </Link>
            <Link to="/schedulle">
              <div className="content-wrapper not">Schedulle</div>
            </Link>
          </Content>

          <h2
            className="title"
            onClick={() =>
              this.setState({ open: open === "fw" ? false : "fw" })
            }
          >
            Firmware Update
          </h2>
          <Content className="content" pose={open === "fw" ? "open" : "closed"}>
            <Link to="/dcufw">
              <div className="content-wrapper not">DCU Firmware</div>
            </Link>
            <Link to="/metersfw">
              <div className="content-wrapper not">Meters Firmware</div>
            </Link>
          </Content>
        </Fragment>
      </div>
    );
  }
}

export default Navbar;

/* <Fragment>
<h1>Accordian demo</h1>
{data.map(({ title, content }, i) => (
  <Fragment>
    <h2
      className="title"
      onClick={() => this.setState({ open: open === i ? false : i })}
    >
      {open === i ? '🤯 ' : '🙂 '}
      {title}
    </h2>
    <Content className="content" pose={open === i ? 'open' : 'closed'}>
      <div className="content-wrapper">{content}</div>
    </Content>
  </Fragment>
))}
</Fragment> */

/* <Fragment>
        <h1>Accordian demo</h1>
     
        
            <h2
              className="title"
              onClick={() => this.setState({ open: open === 'plc' ? false : 'plc' })}
            >
              {open === 'plc' ? '🤯 ' : '🙂 '}
              Laba diena
            </h2>
            <Content className="content" pose={open === 'plc' ? 'open' : 'closed'}>
              <div className="content-wrapper">labas</div>
              <div className="content-wrapper">labas</div>
            </Content>
        
     
      </Fragment> */
