import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    const p = this.props.postInfo
    return (
        <div className="card" style={{width: "18rem"}}>
        <img src={p.img_url} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{p.title}</h5>
          <p>{p.author}</p>
          <p className="card-text">{p.caption}</p>
        </div>
      </div>
    )
  }
}
