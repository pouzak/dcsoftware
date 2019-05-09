import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import { ReactComponent as MenuIcon } from "./icons/menu.svg";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import Navbar from "./Navbar";

const styles = {
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class ButtonAppBar extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
  };
  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <Drawer
          open={this.state.left}
          onClose={() => this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            style={{ padding: "20px" }}
            className="dash"
            // onClick={this.toggleDrawer("left", false)}
            // onKeyDown={this.toggleDrawer("left", false)}
          >
            <Navbar />
          </div>
        </Drawer>
        <AppBar position="static" color="white">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="black"
              aria-label="Menu"
              onClick={() => this.toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="black" className={classes.grow}>
              DC12
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);

// import React, { Component } from "react";
// import {
//   MDBNavbar,
//   MDBNavbarBrand,
//   NavbarNav,
//   MDBNavbarToggler,
//   MDBCollapse,
//   MDBContainer
// } from "mdbreact";
// import Navbar from "./Navbar";

// class NavMobile extends Component {
//   state = {
//     collapseID: ""
//   };

//   toggleCollapse = collapseID => () => {
//     this.setState(prevState => ({
//       collapseID: prevState.collapseID !== collapseID ? collapseID : ""
//     }));
//   };

//   render() {
//     return (
//       <MDBContainer style={{ marginBottom: "0px" }} className="nav-center">
//         <MDBNavbar style={{ marginTop: "20px", boxShadow: "none" }} light>
//           <MDBContainer>
//             <MDBNavbarBrand>DC12</MDBNavbarBrand>
//             <MDBNavbarToggler
//               onClick={this.toggleCollapse("navbarCollapse1")}
//             />
//             <MDBCollapse
//               id="navbarCollapse1"
//               isOpen={this.state.collapseID}
//               navbar
//             >
//               <NavbarNav left>
//                 <Navbar />
//               </NavbarNav>
//             </MDBCollapse>
//           </MDBContainer>
//         </MDBNavbar>
//       </MDBContainer>
//     );
//   }
// }

// export default NavMobile;
