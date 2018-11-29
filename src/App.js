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
        if (this.state.title.length >0){
        firebase.database().ref(this.state.todos.length).set({
            'name': this.state.title,
            'description': 'todo' + this.state.todos.length,
            'checked': false,
        });}
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
                        <div class="task">
                            <label><input type="checkbox" name="[i]" checked={ todo.checked || false } onChange={() => this.checkTodo(todo.id, todo.checked)}
                                autocomplete="off"></input>
                            <i class="fa fa-check"></i>{todo.name}</label>
                            <button class="delete" onClick={() => this.deleteTodo(todo.id)}><i class="fas fa-times"></i></button>
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
                        <div class="task">
                            <label><input type="checkbox" name="any" checked onChange={() => this.checkTodo(todo.id, todo.checked)}></input>
                            <i class="fa fa-check"></i>{todo.name}</label>
                            <button class="delete" onClick={() => this.deleteTodo(todo.id)}><i class="fas fa-times"></i></button>
                        </div>
                    );
                }
            })
            return listdone;
        }

        return (
            <div className="App">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
                <header className="App-header">
                    <h1>To-do list</h1>
                    <div class="container" >
                    <div class="input-task">
                        <input type='text' name='title' value={this.state.title}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={this.handleKeyPress} />
                        <button type="submit" onClick={() => this.setTodo()}>Add a task</button>
                        </div>
                    </div>
                    <div class="container">
                        <h2><i class="fas fa-clipboard-list"></i> Scheduled</h2>
                        {todoList()}
                        <h2><i class="fas fa-clipboard-check"></i> Done</h2>
                        {todoListDone()}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;