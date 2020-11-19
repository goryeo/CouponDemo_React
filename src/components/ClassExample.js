import React, { Component } from 'react';

/*
클래스의 문제점
1.Wrapping Hell
2.복잡하고 거대한 컴포넌트
3.class, this, bind
*/
class ClassExample extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
    
    // componentWillMount(){
    //     document.title = this.state.count;
    //     console.log("log: " + this.state.count);
    // }
    // componentDidMount(){
    //     console.log("componentDidMount");
    // }

    componentDidUpdate(){
        document.title = this.state.count;
    }

    render() {
      return (
        <div>
          <h1>Class Style</h1>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increament Click me
          </button>
          &nbsp;
          <button onClick={() => this.setState({ count: this.state.count - 1 })}>
          Decrement Click me
          </button>
        </div>
      );
    }
  }

  export default ClassExample;