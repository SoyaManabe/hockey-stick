import $ from 'jquery';
import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

import {Button, Header, Modal, Icon, Form, Select} from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sums: [],
      name: '',
      category: '',
      price: ''
    };
    this.serverRequest = this.serverRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
  }
  updateName(e) {
    this.setState({name: e});
  }
  updateCategory(e) {
    this.setState({category: e});
  }
  updatePrice(e) {
    this.setState({price: e});
  }
  /*
  serverRequest(){
    $.get("http://localhost:5000/api/logs/items", res => {
      console.log(res);
      this.setState({
        sums: res
      });
    });
  }
  */
 serverRequest() {
   axios.get('http://localhost:5000/api/logs/items')
    .then(response => {
        console.log(response.data);
        this.setState({
          sums: response.data
        });
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
 }
 /*
  postRequest(){
    $.post(
      "http://localhost:5000/api/logs/items",
      {
        "name":"tea",
        "category": "food",
        "price": 120,
        "date": "2019/11/12",
      }
    );
  }*/
  postRequest() {
    var t = new Date();
    axios.post('http://localhost:5000/api/logs/items', {
      'name':this.state.name,
      'category': this.state.category,
      'price': Number(this.state.price),
      'date': t.getFullYear()+'/'+(t.getMonth()+1)+'/'+t.getDate()
    })
    .then(function (response) {
      setTimeout(() => {
        toast({
            type: 'success',
            icon: 'envelope',
            title: 'Success!!',
            description: 'Successfully added your new spent',
            animation: 'bounce',
            time: 3000
        });
    });
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
          <AddRecord postRequest={this.postRequest} 
            updateName={this.updateName}
            updateCategory={this.updateCategory}
            updatePrice={this.updatePrice}
            name={this.state.name}
            category={this.state.category}
            price={this.state.price}
            
          />
        </div>
        <div className="row centered">
          <Chart className="column" datas={this.state.sums}/>
        </div>
        <div className="row centered">
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
      open: false,
      name: '',
      category: '',
      price: 0,
    }; 
    this.onChange = this.onChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
  }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  onChange(value){
    console.log('changed');
    this.props.updateCategory(value);
  }

  onNameChange(e){
    console.log(e.target.value);
    this.props.updateName(e.target.value);
  }

  onPriceChange(e){
    console.log('changed');
    this.props.updatePrice(e.target.value);
  }

  render() {
    const Options = [
      {value:"食費", text:"食費"},
      {value:"日用品", text:"日用品"},
      {value:"医療費", text:"医療費"},
      {value:"交通費", text:"交通費"},
      {value:"浪費", text:"浪費"},
      {value:"投資", text:"投資"},
      {value:"その他", text:"その他"},
    ];
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
        <SemanticToastContainer />
        <Modal.Header>Add a new Record</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Detail</Header>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder="Name" value={this.props.name}
                  onChange={this.onNameChange}/>
              </Form.Field>
              <Form.Field>
                <label>Category</label>
              <Select placeholder='Select Category' options={Options} 
                value={this.props.category} onChange={(e, {value}) => this.onChange(value)}/>
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input placeholder="Price" value={this.props.price} 
                  onChange={this.onPriceChange}/>
              </Form.Field>
              <Button 
                onClick={this.props.postRequest}
                disabled={!this.props.name
                  || !this.props.category
                  || !this.props.price
                }
              >Submit</Button>
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
  return (
    <div>
    <h2>Total earn</h2>
    {props.datas.map((data, id, arr) => (
      id === arr.length-1 && 
        <h2>¥{data.total}</h2>
    ))}
    </div>
  )
}
export default Home; 
