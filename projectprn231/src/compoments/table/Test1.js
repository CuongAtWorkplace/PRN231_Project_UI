import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';

class Test1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      activePage: 1,
      itemsCountPerPage: 10,
      totalItemsCount: 0
    };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers() {
    axios.get('https://northwindapi.azurewebsites.net/api/customers')
      .then(response => {
        this.setState({
          customers: response.data,
          totalItemsCount: response.data.length
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    const { customers, activePage, itemsCountPerPage, totalItemsCount } = this.state;

    const indexOfLastCustomer = activePage * itemsCountPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsCountPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    return (
      <div>
        <h1>Customer List</h1>
        <ul>
          {currentCustomers.map(customer => <li key={customer.customerID}>{customer.companyName}</li>)}
        </ul>
        <Pagination
          prevPageText='Previous'
          nextPageText='Next'
          firstPageText='First'
          lastPageText='Last'
          itemClass='page-item'
          linkClass='page-link'
          activeClass='active'
          disabledClass='disabled'
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default Test1;