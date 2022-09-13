import React from 'react'
import { Link } from 'react-router-dom';
import '../footer.css';
export default function Footer() {
  return (
    <div><footer className=" text-center text-lg-start">
  
    <div className="text-center p-3 copyright light-color" >
      
      <Link className="red-color" to='http://sydneydoemel.com'> Sydneydoemel.com</Link>
    </div>
   
  </footer></div>
  )
}
