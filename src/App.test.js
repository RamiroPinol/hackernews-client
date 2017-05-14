import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import App from './App';
import Search from './Search';
import Button from './Button';
import Table from './Table';

// App Tests
describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Search Tests
describe('Search', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Button Tests
describe('Button', () => {
  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Test button</Button>, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Button>Test button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Table Tests
describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  };

  it('renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('.table-row').length).toBe(2);
  });
});
