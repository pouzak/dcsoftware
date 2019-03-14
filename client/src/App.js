import React, { Component } from 'react';
import './App.css';
//import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
//import axios from 'axios';
import Dashboard from './components/Dashboard';
import Ethernet from './components/Ethernet';
import BlackList from './components/BlackList';
import MeterStats from './components/MeterStats';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import {MDBCol,MDBRow } from 'mdbreact';
import { Provider } from './Context';

 
class App extends Component {
  state = {
    navOpen: false,
    dc_data: null
  }
  hoverHandler = () => {
    this.setState({
      navOpen: !this.state.navOpen
    })
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
              <MDBCol className="nav-container" size="2">
                <div className="nav-bar">
                <Navbar2 />
                </div>
                </MDBCol>
                <MDBCol className="main">
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/black_List" component={BlackList}/>
                  <Route exact path="/ethernet" component={Ethernet}/>
                  <Route exact path="/meterstats" component={MeterStats}/>
                  
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