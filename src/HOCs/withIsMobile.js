import React, {Component} from 'react';
import {debounce} from 'lodash'


const MOBILE_THRESHOLD = 720;


const withIsMobile = ComponentToExtend => {
  return class WithIsMobile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isMobile: false
      };
      this.checkIfIsMobile = debounce(this.checkIfIsMobile, 1000);
    }

    checkIfIsMobile = () => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < MOBILE_THRESHOLD;
      this.setState({isMobile})
    };

    componentDidMount() {
      this.checkIfIsMobile();
      window.addEventListener('resize', this.checkIfIsMobile);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.checkIfIsMobile)
    }

    render() {
      return <ComponentToExtend isMobile={this.state.isMobile}/>
    }
  }
};

export default withIsMobile;