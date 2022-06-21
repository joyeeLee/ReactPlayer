import './index.css';
import React from 'react'; 

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            name:222,
            ky:props.ky
        }
    }
    addnumder= ()=>{
        let num = this.state.name
        num++

        this.setState((state, props) => ({
            name:num
          }));
    }
    render() {
      return <div className='home'>
          <h1 onClick={this.addnumder}>Hello, {this.state.name}{this.state.ky}</h1>
      </div>
    }
  }
  
  export default Home;