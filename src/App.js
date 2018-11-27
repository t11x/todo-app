import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyCV6T_qMIKOmRHkTepT3mvFLVdVcSOqDgA",
    authDomain: "todolxs.firebaseapp.com",
    databaseURL: "https://todolxs.firebaseio.com",
    projectId: "todolxs",
    storageBucket: "todolxs.appspot.com",
    messagingSenderId: "945676605396"
};

firebase.initializeApp(config);

class App extends Component {

    state = {
        todos: [],
        index: 0,
    }

    componentDidMount() {
        console.log('componentDidMount: -----');
        // firebase.database().ref('todolxs/' + 'todo_1').set({
        //   'name': 'todo_1',
        //   'description': 'todo',
        // })
        firebase.database().ref().on('value', (snapshot) => {
            this.newTodos = [];
            snapshot.forEach((todo) => {
                this.newTodos.push({ id: todo.key, ...todo.val() });
            })
            this.setState({ todos: this.newTodos });
            console.log(this.state.todos);
        })
    }
    setTodo() {
        console.log(this.state.todos.length);
        firebase.database().ref(this.state.todos.length).set({
            'name': this.state.title,
            'description': 'todo' + this.state.todos.length,
            'checked': false,
        });
        // this.state.todos.push(todo);
        this.setState({ title: '' })
    }
    deleteTodo(id) {
        console.log('delete todo w/ id : ' + id);
        firebase.database().ref().child(id).remove();
    }
    checkTodo(id, checked) {
        firebase.database().ref().child(id).update({ checked: !checked });
    }
    handleChange(event) {

        this.setState({ title: event.target.value })

    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setTodo();
        }
    }

    render() {
        const todoList = () => {
            let list = []
            this.state.todos.forEach((todo) => {
                if (todo.checked === false) {
                    list.push(
                        <div>
                            <input type="checkbox" unchecked onChange={() => this.checkTodo(todo.id, todo.checked)}
                            autocomplete="off"></input>
                            <p>{todo.name}</p>
                            <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
                        </div>
                    );
                }
            })
            return list;

        }
        const todoListDone = () => {
            let listdone = []
            this.state.todos.forEach((todo) => {
                if (todo.checked === true) {
                    listdone.push(
                        <div>
                            <input type="checkbox" checked onChange={() => this.checkTodo(todo.id, todo.checked)}></input>
                            <p>{todo.name}</p>
                            <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
                        </div>
                    );
                }
            })
            return listdone;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <input type='text' name='title' value={this.state.title}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress}
                    />
                    {todoList()}
                    {todoListDone()}
                    <p></p>
                    <button onClick={() => this.setTodo()}
                    ></button>
                </header>
            </div>
        );
    }
}

export default App;
