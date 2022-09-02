import React, { Component } from 'react'
import Post from '../components/Post';
import { Link } from 'react-router-dom';

export default class IG extends Component {
    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }

    componentDidMount = async () => {
        this.getPosts()
    }

    getPosts = async () => {
        const res = await fetch('http://127.0.0.1:5000/api/posts');
        const data = await res.json();
        this.setState({posts: data.posts})
    }

    showPosts = () => {
        return this.state.posts.map(p=><Link key={p.id} to={`/posts/${p.id}`}><Post  postInfo={p}/></Link>)
    }

    render = () => {
        return (
            <div>
                {this.showPosts()}
            </div>
        )
    }
}
