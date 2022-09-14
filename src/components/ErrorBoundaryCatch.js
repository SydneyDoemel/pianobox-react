import React, { Component } from 'react'

export default class ErrorBoundaryCatch extends Component {
  constructor(props) {
    super(props);
    this.state={error:null,}
  }

 
  componentDidCatch(error, errorInfo){
    console.log({error, errorInfo});
  }
 static getDerivedStateFromError(error){
  return {error};
 }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}