import React, { Component } from 'react';
import Minicar from './Minicar'; 
import styled from 'styled-components';

const Item = styled.div`
  background: red;
  text-align: center;
  padding: 50px;
  color: white;
  width: 100px;
`

const Item2 = styled.div`
  background: green;
  text-align: center;
  padding: 50px;
  color: white;
  width: 100px;
`

const Item3 = styled.div`
  background: yellow;
  text-align: center;
  padding: 50px;
  color: white;
  width: 100px;
`



export default class MinicarPage extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      change: false,
      WindowSize : window.innerWidth
    }
  }

  componentDidMount() {
    this.generateList();
		window.addEventListener("resize", this.handleResize);
	}
	componentWillUnmount() {
		window.addEventListener("resize", null);
	}

	handleResize = (WindowSize, event) => {
        this.setState({WindowSize: window.innerWidth})
    }


  changeFilter = () => {
    this.setState({
      change: !this.state.change
    }, () => {
      this.generateList();
    })
  }
  
  generateList = () => {
    var count = 3;
    var list = [];

    for (var i = 0; i < count; i++) {
      var c = [];
      if (i === 2) {
        if (this.state.change) {
          for(var j = 0; j < 2; j++) {
            c.push(Item);
          }
        } else {
          for(var j = 0; j < 5; j++) {
            c.push(Item);
          }
        }
      } else {
        for(var j = 0; j < 9; j++) {
          c.push(Item);
        }
      }
      list.push(c);
    }

    this.setState({
      items: list
    })
  }

  render() {
    console.log(this.state.items);
    return (
      <div>
        {this.state.items.map((item, i) => {
         return <Minicar
            itemWidth={(this.state.WindowSize  < 1025 ) ? '364' : '398'} 
						excessWidth={511}
						width={this.state.WindowSize}
						category={"test"}
						slideSpeed={"0.5"}
						filter={this.state.filteredRaftId}
          >
              {item.map((it , j) => {
                return <Item>{j}</Item>
              })}

          </Minicar>
        })}
      </div>
    );
  }
}