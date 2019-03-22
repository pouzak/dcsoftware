import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
//import axios from 'axios';
import Dashboard from './components/Dashboard';
import Ethernet from './components/Ethernet';
import BillingChart from './components/BillingChart';
import MeterStats from './components/MeterStats';
import NavMobile from './components/NavMobile';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import {MDBCol,MDBRow } from 'mdbreact';
import { Provider } from './Context';
import Page404 from './components/Page404'
import DCU_cfg from './components/DCU_cfg'


 
class App extends Component {
  state = {
    navOpen: false,
    dc_data: null,
    width: 0,
    height: 0
  }
  hoverHandler = () => {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', () => this.updateWindowDimensions());
  }
  

/* componentDidMount(){
  axios
  .get('http://localhost:5000/cfg')
  .then(function (response) {
    console.log(response.data);
    this.setState({
      data: response.data
    })
  })
  .catch(function (error) {
    console.log(error);
  });
} */


  
  render() {
    //console.log(this.state.width)
    const nav = this.state.navOpen ? (
      <MDBCol size="3" className="nav-bar float-right">
              <Navbar2 />
            </MDBCol>
    ) : (
      <button> yes</button>
    )

    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <div className="gradient">
              <MDBRow className="dash">
              {this.state.width > 1000? (
                <MDBCol className="nav-container" size="2">
                <div className="nav-bar">
                <Navbar />
                </div>
                </MDBCol>
              ): (<NavMobile />)}
                <MDBCol className="main">
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/ethernet" component={Ethernet}/>
                  <Route exact path="/meterstats" component={MeterStats}/>
                  <Route exact path="/topology" component={Page404}/>
                  <Route exact path="/dcuconfig" component={DCU_cfg}/>
                  <Route component={Page404} />
                  
                  
                </Switch>
                </MDBCol>
                
              </MDBRow>
              </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
//<div onClick={()=> this.hoverHandler() }>{nav}</div>
/* <MDBCol size="2.5" className="nav-bar float-right">
              <Navbar />
            </MDBCol> */


         /*    <MDBRow className="main">
            <MDBCol size="2.5" className="nav-bar float-right">
              <Navbar2 />
              </MDBCol>
              <MDBCol className="dash">
                <Test />
              </MDBCol>
            
            </MDBRow>
             <p>{this.state.dc_data ? (<p>{this.state.dc_data.config.settings.date_time.date}</p>): (<div class="spinner-border" role="status"></div>)}</p>

    <Route path="/stories/:id" component ={Post} />
                <Route path="/addstory" component ={AddStory}/>

            */