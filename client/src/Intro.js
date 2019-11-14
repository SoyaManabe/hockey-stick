import $ from 'jquery';
import React from 'react';
import './Intro.css';

import { Container } from "semantic-ui-react"

class Intro extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <div className="toppadding"></div>
        <div className="ui vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui header">Hockey Stick</h1>
            <h2>Empower your cost experience</h2>
          </div>
          <div className="toppadding"></div>
          <div className="ui divider"></div>
        </div>

      </div>
    )
  } 
}

export default Intro;
