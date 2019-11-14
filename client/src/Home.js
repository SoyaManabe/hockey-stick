import $ from 'jquery';
import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

import {Button, Header, Modal, Icon, Form, Select} from 'semantic-ui-react'

  const Options = [
    {key:"tr", value:"tr", text:"Transport"},
    {key:"fo", value:"fo", text:"Food"},
    {key:"bo", value:"bo", text:"Book"},
    {key:"ni", value:"ni", text:"Nichi"},
    {key:"jo", value:"jo", text:"Jou"},
    {key:"ke", value:"ke", text:"KEi"},
  ]
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sums: [],
    };
    this.serverRequest = this.serverRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

 serverRequest() {
   axios.get('http://localhost:5000/api/logs/items')
    .then(function (response) {
        console.log(response);
        this.setState({
          sums: response
        });
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {

    });
 }

  postRequest() {
    axios.post('http://localhost:5000/api/logs/items', {
      'name':'tea',
      'category': 'food',
      'price': 120,
      'date': '2019/11/12'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount(){
    this.serverRequest();
  }
  render() {
    return (
      <div className="ui grid container">
        <div className="row centered">
          <h1>Hello, Soya</h1>
        </div>
        <div className="row centered">
          <AddRecord postRequest={this.postRequest}/>
        </div>
        <div className="row centered">
          <Chart className="column" datas={this.state.sums}/>
          <RenderPrice className="column" datas={this.state.sums}/>
        </div>
      </div>
    )
  }
}
class AddRecord extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }; 
  }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render() {
    return(
      <Modal trigger={
        <Button onClick={this.open} className="ui primary button">
          <i className="money icon"></i> Add Record
        </Button>}
        open={this.state.open}
        onClose={this.close}
        basic
        size='small'
      >
        <Modal.Header>Add a new Record</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Detail</Header>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder="Name"/>
              </Form.Field>
              <Form.Field>
                <label>Category</label>
                <Select placeholder='Select Category' options={Options}/>
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input placeholder="Price"/>
              </Form.Field>
              <Button onClick={this.props.postRequest}>Submit</Button>
              <Button onClick={this.close} negative>
                <Icon name='remove'/>Cancel
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
function Chart(props) {
  return (
    <ResponsiveContainer width="70%" height={300}>
      <BarChart
        data={props.datas}
        stackOffset="sign"
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="price" height={30} stroke="#8884d8" />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="date" height={30} stroke="#8884d8" />
        <Bar dataKey="price" stackId="a" fill="#82ca9d" />
        <Bar dataKey="diff" stackId="a" fill="#8884d8" />
        <Bar dataKey="total" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}
function RenderPrice(props) {
  console.log(props.datas);
  return (
    <div>
    <h2>Total earn</h2>
    {props.datas.map((data, id, arr) => (
      id == arr.length-1 && 
        <h2>¥{data.total}</h2>
    ))}
    </div>
  )
}
export default Home; 
