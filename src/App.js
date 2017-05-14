import React, { Component } from 'react';
import Search from './Search';
import Table from './Table';
import Button from './Button';
import Loading from './Loading';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchTerm: DEFAULT_QUERY,
      searchKey: '',
      isLoading: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } },
      isLoading: false,
    });
  }

  needsToSearchTopstories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopstories(searchTerm, page) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    this.setState({ searchKey: this.state.searchTerm });
    this.fetchSearchTopstories(this.state.searchTerm, DEFAULT_PAGE);
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updatedHits = hits.filter(item => item.objectID !== id);
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    this.setState({ searchKey: this.state.searchTerm });
    if (this.needsToSearchTopstories(this.state.searchTerm)) {
      this.fetchSearchTopstories(this.state.searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  render() {
    const { searchTerm, results, searchKey, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <div className="App">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >Search</Search>
            <Table
              list={list}
              onDismiss={this.onDismiss}
            />
            <div className="interactions">
              {isLoading ?
                <Loading /> :
                <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
                  More
                </Button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
