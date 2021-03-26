import React, { Component } from "react";
import API from "../../utils/randomapi.js";
import Header from "../header/header.js";
import TableRow from "../table/tablerow.js";
import Table from "../table/table.js";

class Search extends Component {
  state = {
    search: "",
    results: [],
    isToggleOn: true
};

  componentDidMount() {
    API.getEmployee()
      .then(res => {
        let sortEmployee = res.data.results.sort((a, b) => {
          return a.name.first.localeCompare(b.name.first);
        })
        this.setState({ results: sortEmployee })
      })
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    let search = event.target.name
    let value = event.target.value;

    this.setState({
      [search]: value
    });

  };

  handleToggle = event => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
    this.state.results.reverse()
  };


    render() {
    return (
      <div>
        <Header />
        <div className="text-center container my-5">
        <h2>Search for an Employee :</h2>
        <input
        className="text-center container my-5"
        value={this.state.search}
        name="search"
        onChange={this.handleInputChange}
        type="text"
        placeholder="Search"
        />
        <table className="table">
            <tr>
              <th scope="col">Image</th>
              <th scope="col" className={this.state.isToggleOn ? 'carrot on' : 'carrot off'} onClick={this.handleToggle}>Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">State</th>
            </tr>

            {this.state.results.filter(elem => (elem.name.first + " " + elem.name.last).includes(`${this.state.search}`)).map((info, index) => (
            <tr scope="row" key={info.email}>
                <td><img src={info.picture.large} alt="employee thumbnail"></img></td>
                <td>{`${info.name.first} ${info.name.last}`}</td>
                <td>{info.phone}</td>
                <td>{info.email}</td>
                <td>{info.location.state}</td>
            </tr>
            ))}
        </table>
    </div>
    </div>
  )
}
}
export default Search;