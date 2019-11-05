import $ from 'jquery';
import React from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sums: [],
    };
    this.serverRequest = this.serverRequest.bind(this);
  }
  serverRequest(){
    $.get("http://localhost:5000/api/logs/sums", res => {
      console.log(res);
      this.setState({
        sums: res
      });
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
          <Chart className="column" datas={this.state.sums}/>
          <RenderPrice className="column" datas={this.state.sums}/>
        </div>
      </div>
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
