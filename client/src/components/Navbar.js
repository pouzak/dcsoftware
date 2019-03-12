import React, { Fragment,Component } from 'react';
import './Navbar.css'
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {
 
 fullList: {
    width: 200,
    height: 500,
    position: 'absolute',
    display: 'flex'
  }
  
};

class Navbar extends Component {

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  
  
  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className="navv">
        <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
      <SwipeableDrawer
          anchor="left"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}
          onOpen={this.toggleDrawer('top', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

export default withStyles(styles)(Navbar)


{/* <nav class="navigation">
<ul class="mainmenu">
  <li><a href="">Home</a>
  <ul class="submenu">
      <li><a href="" >Tops</a></li>
      <li><a href="">Bottoms</a></li>
      <li><a href="">Footwear</a></li>
    </ul>
  </li>
  <li><a href="">About</a>
  <ul class="submenu">
      <li><a href="">Tops</a></li>
      <li><a href="">Bottoms</a></li>
      <li><a href="">Footwear</a></li>
    </ul></li>
  <li><a href="">Products</a>
    <ul class="submenu">
      <li><a href="">Tops</a></li>
      <li><a href="">Bottoms</a></li>
      <li><a href="">Footwear</a></li>
    </ul>
  </li>
  <li><a href="">Contact us</a></li>
</ul>
</nav> */}