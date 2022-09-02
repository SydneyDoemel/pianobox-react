import React, { Component } from 'react'
import '../App.css';
import CartItem from '../components/CartItem';




export default class Cart extends Component {
    constructor(){
        super();
        this.state = {
            cart_items:[],
            message: false
        }
    }
    message = ()=>{
        if (this.state.message === true){
            return(
                <><div className="alert alert-danger" role="alert">
                    Cart cleared
              </div></>
            )
        }
    }
    
    clearCart = async (e) => {
    
        const res = await fetch(`http://127.0.0.1:5000/api/del`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.props.user.token}`,
                'Content-Type': 'application/json'
                
            },
        });
        const data = await res.json();
        console.log(data)
        this.setState({cart_items: data.items}) 
        this.setState({message: true})  
    }    
    componentDidMount = async () => {
        this.getItems()
    }
    
    getItems = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/cart`, {
            headers: {
                Authorization: `Bearer ${this.props.user.token}`,
                "Content-Type": 'application/json'
            }
        });
        const data = await res.json();
        this.setState({cart_items: data.items})  
       
     
    }

    showCart = () => {
            if (this.state.cart_items !== undefined){
                return this.state.cart_items.map((p,i)=><CartItem  key={i} itemInfo={p} getItems={this.getItems} user={this.props.user}/>)
            }
            else{
                return <><p className='mx-auto'>Your cart is empty.</p></>
            }
           
        
        
            
    }
    
   

    render = () => {
        return (<>
       
            <div className='container'>
                <div className="mx-auto d-flex">
                    <h1 className='text-center mx-auto mb-5 mt-5'>Cart</h1>
                    <button onClick={(e) => { this.clearCart(e)}} className='btn btn-outline-danger  mb-5 mt-5'>Clear Cart</button>
                </div >
                <div className='d-flex '>
                {this.showCart()}
                </div>
                
            </div>
            {this.message()}
            </>
        )
    }
}



