import React from 'react';
import './sales_styles.css'; // Import your CSS file

class QuoteTrackingProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      customerName: '',
      customerAddress: '',
      customerContact: '',
      secretNotes: '',
      customerEmail: ''
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    // Implement login functionality here
    this.setState({ loggedIn: true });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleQuoteSubmit = (event) => {
    event.preventDefault();
    // Implement quote submission functionality here
  };

  cancelQuote = () => {
    // Implement cancellation functionality here
    this.setState({
      loggedIn: false,
      customerName: '',
      customerAddress: '',
      customerContact: '',
      secretNotes: '',
      customerEmail: ''
    });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Green House Quote System</h1>
        {!this.state.loggedIn && (
          <form id="loginForm" onSubmit={this.handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>
        )}
        {this.state.loggedIn && (
          <div id="quoteForm">
            <h2>New Quote</h2>
            <form id="newQuoteForm" onSubmit={this.handleQuoteSubmit}>
              <label htmlFor="customerName">Customer Name:</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={this.state.customerName}
                onChange={this.handleChange}
                required
              />
              <br />
              <label htmlFor="customerAddress">Customer Address:</label>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                value={this.state.customerAddress}
                onChange={this.handleChange}
                required
              />
              <br />
              <label htmlFor="customerContact">Customer Contact Info:</label>
              <input
                type="text"
                id="customerContact"
                name="customerContact"
                value={this.state.customerContact}
                onChange={this.handleChange}
                required
              />
              <br />

              <h3>Quote Details</h3>
              <div id="lineItems">
                {/* Line item fields will be added dynamically */}
              </div>
              <button type="button" onClick={this.addLineItem}>
                Add Line Item
              </button>
              <br />

              <label htmlFor="secretNotes">Secret Notes:</label>
              <br />
              <textarea
                id="secretNotes"
                name="secretNotes"
                value={this.state.secretNotes}
                onChange={this.handleChange}
              ></textarea>
              <br />

              <label htmlFor="customerEmail">Customer Email:</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={this.state.customerEmail}
                onChange={this.handleChange}
                required
              />
              <br />

              <button type="submit">Save Quote</button>
              <button type="button" onClick={this.cancelQuote}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default QuoteTrackingProgram;
