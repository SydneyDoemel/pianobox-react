import React, { Component } from 'react'

export default class CreatePost extends Component {

    sendCreateInfo = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/api/posts/create', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.props.user.token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title: e.target.title.value,
                caption: e.target.caption.value,
                imgUrl: e.target.imgUrl.value
            })
        });
        const data = await res.json();
        console.log(data)
    };

    render() {
        return (
            <form className='col-4' onSubmit={(e) => { this.sendCreateInfo(e) }}>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' />
                </div>
                <div className="mb-3">
                    <label className="form-label">Caption</label>
                    <input type="text" className="form-control" name='caption' />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" name='imgUrl' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
