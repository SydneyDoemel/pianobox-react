import React, { Component } from 'react'
import ShopItem from '../components/ShopItem';
import '../App.css';
export default class Shop extends Component {
    constructor(){
        super();
        this.state = {
            items:[]
        }
    }
 
    componentDidMount = async () => {
        this.getItems()
    }

    getItems = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/shop');
        const data = await res.json();
        this.setState({items: data.items})  
      
    }

    showShop = () => {
        return this.state.items.map(p=><ShopItem  key={p.id} getItems={this.getItems} itemInfo={p} user={this.props.user}/>)
    }

    render = () => {
        return (
            <div className='container'>
                <div className='mx-auto'>
                    <h1 className='text-center mx-auto mb-5 mt-5'>Shop</h1>
                    <div className='show-shop d-flex'>
                    {this.showShop()}
                    </div>

                </div>
            </div>
        )
    }
}