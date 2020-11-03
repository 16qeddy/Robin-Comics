import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { Button, Card, Navbar, Nav, NavDropdown, FormControl, Form, Spinner } from 'react-bootstrap';
import '../styles/app.css';
import SeriesCard from './seriesCard.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      comicList: [],
      loading: false,
      search: '',
      series: null
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.getComics = this.getComics.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.seriesOnClick = this.seriesOnClick.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.getComics('carnage');
  }

  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    })
  }

  getComics(query) {
    let comics = [];
    this.toggleLoading();
    axios.get(`https://intense-earth-62649.herokuapp.com/api/search-comic/${query}`)
      .then((data) => {
        this.setState({
          comicList: data.data
        })
        this.toggleLoading();
        console.log(this.state.comicList);
      })
  }

  searchOnChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  onSubmit() {
    this.getComics(this.state.search);
    this.setState({
      search: ''
    })
  }

  seriesOnClick(comicSeries) {
    this.setState({
      series: comicSeries
    })
  }

  goHome() {
    this.setState({
      loading: false,
      search: '',
      series: null
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loadingFrame">
          <div className="top"></div>
          <div class='loading'>
            <div class="blackBox">
              Loading
            <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="warning" />
            </div>
          </div>
          <div className="top"></div>
        </div>
      )
    }
    return (
      <div className="yellowText AppContainer">
        <Navbar bg="danger" expand="lg">
          <Navbar.Brand className="yellowText" href="#home">Robin Comics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.goHome} href="#home">Home</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl onChange={this.searchOnChange} type="text" placeholder="Search" className="mr-sm-2" />
              <Button onClick={this.onSubmit} className="test" variant="dark">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="comicSpace">
          <div className="sides"></div>
          <div className="center">
            {this.state.comicList.map((item) => {
              return <SeriesCard clickHandler={this.seriesOnClick} series={item} />
            })}
          </div>
          <div className="sides"></div>
        </div>
      </div>
    );
  }
}

export default App;
