import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class ShopItem extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       message: false
    }
  }
  message = ()=>{
    if (this.state.message === true){
        return(
            <><div className="alert alert-success" role="alert">
                Succesfully added to cart
          </div></>
        )
    }
}
  addItem = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/api/cart/add`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${this.props.user.token}`,
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify({
            title: this.props.itemInfo.title
        })
    });
    const data = await res.json();
    console.log(data)
    this.props.getItems()
    this.setState({message: true})  
   
}
  render() {
    const item = this.props.itemInfo;

    
    return (
      <>
      <div className='container'>
        <div className="card m-3 pb-0 w-75 " >
        <div className="shop-image"><img className="card-img-top" src={item.img_url} alt="..." /></div>
      
        <div className="card-body bg-dark text-light" styles={{"color": "white"}}>
        <h5 className="card-title" ><b>{item.title}</b></h5>
        <p className="card-text" ><b>${item.price}<br />{item.description}</b></p>
        <Link key={item.id} to={`/shop/${item.id}`} className="btn btn-light ">View</Link>
        <button onClick={(e) => { this.addItem(e)}} className="btn btn-dark m-2 btn-outline-light">Add to Cart</button>
        
        
      </div>
     
    </div>
    {this.message()}
    </div>
    
    </>
    )
  }
}


////////