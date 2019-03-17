import React, { Component } from 'react'
import { MDBDataTable,MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import axios from 'axios';



/* const data = {
  columns: [
    { */

const columns = [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Mac',
      field: 'mac',
      sort: 'asc',
      width: 200
    },
    {
      label: 'LNID',
      field: 'lnid',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Availability',
      field: 'availability',
      sort: 'asc',
      width: 60
    },
    {
      label: 'FW',
      field: 'fw',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Statistics',
      field: 'stats',
      sort: 'asc',
      width: 100
    }
  ]
  const rowsz =  [
    {
      name: 'Tiger Nixon',
      position: 'System Architect',
      office: 'Edinburgh',
      age: '61',
      date: '2011/04/25',
      name: "Alex", 
      
    },
    
  ] 

  

export class List extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }
  handleRowClick = (e) => {
   //e.preventDefault();
    console.log(e)
  }

  componentDidMount(){
    axios
    .get('api/txt')
    .then(res => {
     
    
    //this.setState({data: {columns, rows: res.data}});
    //console.log(res.data)
  //const data = this.state.data ? ({columns, rows: this.state.data}): (null)
  const datule = res.data.map(item => {
    let obj = {}
    obj.name = item.name;
    obj.mac = item.mac.slice(0, 2) + ":" + item.mac.slice(2,4)+ ":" + item.mac.slice(4,6) + ":" + item.mac.slice(6,8) + ":" + item.mac.slice(8,10) + ":" + item.mac.slice(10,12);
    obj.lnid = item.lnid;
    obj.availability = item.availability;
    obj.FW = item.fw;
    obj.stats = [
      <MDBBtnGroup>
      <MDBDropdown>
        <MDBDropdownToggle caret color="info" className="h-100" size="sm">
          Stats
        </MDBDropdownToggle>
        <MDBDropdownMenu basic color="info">
          <MDBDropdownItem onClick={() => this.handleRowClick(item.name)}>Billing</MDBDropdownItem>
          <MDBDropdownItem onClick={() => this.handleRowClick(item.name)}>Statistics</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBBtnGroup>
    ]
    return obj;
  }) 

  {/* <MDBBtn color="purple" onClick={() => this.handleRowClick(item.name)} outline size="sm">Billing</MDBBtn>
    ,<MDBBtn color="purple" onClick={() => this.handleRowClick(item.name)} outline size="sm">Billing</MDBBtn>]
 */}
  //console.log(res)
  datule.shift();
  this.setState({data: {columns, rows: datule}});

    })
    .catch(err => console.log(err));
  }

  
   
  render() {
    const dataa = {
      columns : [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Mac',
          field: 'mac',
          sort: 'asc',
          width: 270
        },
        {
          label: 'LNID',
          field: 'lnid',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Availability',
          field: 'availability',
          sort: 'asc',
          width: 100
        },
        {
          label: 'FW',
          field: 'fw',
          sort: 'asc',
          width: 100
        }],
      rows:  [
        {
          name: 'Tiger Nixon',
          clickEvent: this.handleRowClick,
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          //buttun: <MDBBtn color="purple" clickEvent={() => this.handleRowClick(this.name)} outline size="sm">Button</MDBBtn>

         
          
        }
        
      ] }
    //console.log(data)
    const table = this.state.data ? (
      <MDBDataTable
        //striped
        sortable={false}
        bordered
        hover
        //data={this.state.data}
        data={this.state.data}
        entries={5} 
        entriesOptions={[ 5, 10, 15, 100 ]}

  />) : (<div>Loading...</div>)
    return (
      <div>
        {table}
      </div>
    )
  }
}

export default List

