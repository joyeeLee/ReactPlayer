import './index.scss';
import React from 'react'; 
import Top from '../../components/Top/index.jsx'
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
      return(
      <div className='home'>
          <div className='homeWrapper'>
              <Top></Top>
          </div>
      </div>
      )
    }
    componentDidMount(){
        // console.log(43243)
    }
  }
  
  export default Home;