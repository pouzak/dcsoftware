import React, { Component } from 'react'
import Pagination from "react-paginating";
import axios from 'axios';
import './MeterStats.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import BillingModal from './BillingModal';



let fruits = [
    "apple",
    "banana", "avocado",
    "coconut", "blueberry",
    "payaya", "peach",
    "pear", "plum"
  ];
  var size = 8; 
  var arrayOfArrays = [];
 
  //console.log(Math.round(fruits.length/5));

const limit = 2;
//const pageCount =Math.round(fruits.length/5);
//const total = fruits.length * limit;




class MeterStats extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      data: null,
      modal: false,
      meter:null
    };
  }
  componentDidMount(){
    axios
    .get('api/meters')
    .then(res => {
      for (var i=0; i<res.data.length; i+=size) {
        arrayOfArrays.push(res.data.slice(i,i+size));
      this.setState({data: res.data});
      
      //console.log(this.state.dc_data)
      //console.log(this.state.data)
      
   }
    })
    .catch(err => console.log(err));
  }
  handlePageChange = (page, e) => {
    this.setState({
      currentPage: page
    });
  };
getBillingInfo = (item) => {
  this.setState({
    meter: item,
    modal: !this.state.modal
  });
}

toggleModal = () => {
     this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { currentPage } = this.state;
    //console.log(this.state.modal)
    return (
      <div>
        {this.state.data ? (
      <div>
        <ul>
          {arrayOfArrays[currentPage -1].map(item => (
            <li className="list-item" key={item}>{item}<MDBBtn onClick={() => this.getBillingInfo(item)} color="grey" size="sm">Billing</MDBBtn><MDBBtn color="#424242 grey darken-3" size="sm">Stats</MDBBtn></li>
          ))}
        </ul>
        <Pagination
          total={arrayOfArrays.length * limit}
          limit={limit}
          pageCount={5}
          currentPage={currentPage}
        >
          {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </button>

              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {"<"}
                </button>
              )}

              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: "#fdce09" };
                }
                return (
                  <button
                    {...getPageItemProps({
                      pageValue: page,
                      key: page,
                      style: activePage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}

              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {">"}
                </button>
              )}

              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </button>
              {this.state.data.length}
            </div>
          )}
        </Pagination>

        <MDBContainer>
        
        <MDBModal isOpen={this.state.modal} toggle={() =>this.toggleModal()} centered size="lg">
          <MDBModalHeader toggle={() =>this.toggleModal()}>Billing info</MDBModalHeader>
          <MDBModalBody>
            <BillingModal meter={this.state.meter}/>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={() =>this.toggleModal()}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      </div>
      ) : (<p className="centered">loading</p>)}
      </div>
    );
  }
}

export default MeterStats;

/*
let fruits = [
  "apple",
  "banana", "avocado",
  "coconut", "blueberry",
  "payaya", "peach",
  "pear", "plum"
];
var size = 5; 
var arrayOfArrays = [];
for (var i=0; i<fruits.length; i+=size) {
     arrayOfArrays.push(fruits.slice(i,i+size));
}
console.log(Math.round(fruits.length/5));

const limit = 2;
const pageCount =Math.round(fruits.length/5);
const total = fruits.length * limit;
*/

