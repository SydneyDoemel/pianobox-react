import React, { useState, useEffect } from 'react'
import ShopItem from '../components/ShopItem';


import { useParams } from 'react-router-dom';

export default function SingleItem() {
    const { itemId } = useParams()
    const [ item, setItem ] = useState({})

    const getSingleItem = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/shop/${itemId}`);
        const data = await res.json();
        if (data.status === 'ok'){
            setItem(data.item)
        }
    };

    useEffect(()=>{
        getSingleItem()
    }, [])

  return (
    <div>
        <ShopItem itemInfo = {item}/>


       
        

    </div>
  )
}
