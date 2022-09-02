import React, { Component } from 'react'
import Article from '../components/Article';

export default class News extends Component {
    constructor() {
        super();
        // initial state
        this.state = {
            articles: [],
            done: false
        }
    }


    getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
        const data = await res.json()
        console.log(data)
        this.setState({ articles: data.articles })
    }

    async componentDidMount() {
        this.getNews('bitcoin')
    }


    showArticles = () => {
        return this.state.articles.map((a, i) => 
            (
                <Article key={i} articleInfo={a}/>
            )
        )
    }

    search = (e) => {
        e.preventDefault();
        const input = e.target.search.value;
        this.getNews(input)
    };

    render() {
        return (
            <div>
                {this.state.done? <p>DONE!</p>: <p>Not done</p>}
                <button onClick={()=>{this.setState({done:true})}}>Mark Complete</button>

                <form onSubmit={this.search}>
                    <input name='search'/>
                    <button>Search</button>
                </form>
                <div className='row'>


                    {this.showArticles()}
                </div>
            </div>
        )
    }

}
