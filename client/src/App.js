import $ from 'jquery';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Intro from './Intro';

import { Container } from "semantic-ui-react"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activeArray:["","active","",""],
      page:1,
    };
    this.clickHeader = this.clickHeader.bind(this);
    this.serverRequest = this.serverRequest.bind(this);
  }
  clickHeader(id){
    var arr = ["","","",""]
    arr[id] = "active"
    this.setState({page:id})
    this.setState({activeArray:arr})
    console.log(id,arr[id])
  }
  serverRequest(){
    $.get("http://localhost:5000/api/logs/items", res => {
      console.log(res);
      this.setState({
        items: res
      },()=>{
        console.log(this.state.items[0].name)
      });
    });
  }
  componentDidMount(){
    this.serverRequest();
    console.log(this.state.items[2])
  }
  render() {
    return (
      <div className="App">
        <Header clickHeader={this.clickHeader} arr={this.state.activeArray}/>
        <Container style={{marginTop:"5em"}}>
        <div>
          {this.state.page == 0 && <Intro/>}
          {this.state.page == 1 && <Home/>}
          {this.state.page == 2 && <ItemTable items={this.state.items}/>}
          {this.state.page == 3 && <Export/>}
        </div>
        </Container>
      </div>  
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="ui inverted top fixed menu">
        <div className="ui container">
          <a id = {0} className="header item"
            onClick={() => this.props.clickHeader(0)}>
            Hockey Stick
          </a>
          <a id = {1} className={(this.props.arr[1]) + ' ' + 'item'}
            onClick={() => this.props.clickHeader(1)}>Home</a>
          <a id = {2} className={(this.props.arr[2]) + ' ' + 'item'} 
            onClick={() => this.props.clickHeader(2)}>Logs</a>
          <a id = {3} className={(this.props.arr[3]) + ' ' + 'item'}
            onClick={() => this.props.clickHeader(3)}>Export</a>
        </div>  
      </div>
    )
  }
}

function ItemTable(props) {
  return (
    <div className="ui container">
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map(item => (
            <Item item={item}/>
          ))}
        </tbody>
      </table>
    </div>  
  )
}

function Item(props) {
  return (
    <tr key={props.item.id}>
      <td>{props.item.date}</td>
      <td>{props.item.name}</td>
      <td>{props.item.category}</td>
      <td>¥{props.item.price}</td>
    </tr>
  )
}

class Export extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1>Here is Export page but not developed yet</h1>
    )
  }
}
export default App;
