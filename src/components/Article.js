import React, { Component } from 'react'

export default class Article extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    render() {
        const a = this.props.articleInfo
        return (
            <div className="card" style={{ width: "18rem" }}>
                <img src={a.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{a.title}</h5>
                    <p>{a.author} - {a.source.name}</p>
                    <p className="card-text">{a.description}</p>
                    <a href={a.url} className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
    }
}
