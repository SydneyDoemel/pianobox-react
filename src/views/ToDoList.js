import React, { Component } from 'react'
import ToDoItem from '../components/ToDoItem';

export default class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            todoItems : []
        }
    };

    addToList =  (e) => {
        e.preventDefault();
        const thingToDo = e.target.thing.value
        // option 1: create a copy, mutate the copy, then use setter function
        // const copy = this.state.todoItems.slice()
        // copy.push(thingToDo)
        // this.setState({todoItems: copy})
        // option 2: spread operator
        // const copy = [...this.state.todoItems, thingToDo]
        // this.setState({todoItems: copy})
        // option 3: concatenation
        const obj = {
            text: thingToDo,
            complete: false
        }
        this.setState({todoItems: this.state.todoItems.concat([obj])})
    };
    
    removeFromList = (index) => {
        const newList = [...this.state.todoItems]
        newList.splice(index, 1)
        this.setState({todoItems: newList})
    };

    markComplete = (newObj, index) => {
        const newList = this.state.todoItems.slice()
        newList.splice(index, 1, newObj)
        this.setState({todoItems: newList})
    };

    showList = () => {
        return this.state.todoItems.map((t, i) => <ToDoItem key={i} obj={t} index={i} markComplete={this.markComplete} removeFromList={this.removeFromList}></ToDoItem>)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>{this.addToList(e)}}>
                    <input name='thing'/>
                    <button>Add To List</button>

                </form>

                {this.showList()}




            </div>
        )
    }
}
