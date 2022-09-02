import React, { Component } from 'react'

export default class ToDoItem extends Component {

    handleClick = () => {
        const copy = {...this.props.obj, complete: !this.props.obj.complete}
        this.props.markComplete(copy, this.props.index)
    }

    render() {
        return (
            <div>
                {this.props.obj.text}
                <input type='checkbox' checked={this.props.obj.complete} />
                <button onClick={()=>{this.handleClick()}}>Mark Complete</button>
                <button onClick={()=>{this.props.removeFromList(this.props.index)}}>x</button>
            </div>
        )
    }
}
