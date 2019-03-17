import React, { Component } from 'react'

class BillingModal extends Component {
  render() {
    return (
      <div>
        <p style={{width: "500px"}}>{this.props.meter}</p>
      </div>
    )
  }
}

export default BillingModal
